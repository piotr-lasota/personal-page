using System.Net;
using DataAccess.Repositories.JsonDtos;
using Domain.Models;
using Domain.Repositories;
using Microsoft.Azure.Cosmos;
using Microsoft.Extensions.Logging;

namespace DataAccess.Repositories;

public class CosmosDbBlogPostRepository : IBlogPostRepository
{
    private static string? _databaseName;
    private readonly ILogger<CosmosDbBlogPostRepository> _logger;
    private readonly Container _container;

    public CosmosDbBlogPostRepository(
        ILogger<CosmosDbBlogPostRepository> logger,
        CosmosClient cosmosClient)
    {
        if (_databaseName is null)
        {
            var isDevelopment = Environment.GetEnvironmentVariable("AZURE_FUNCTIONS_ENVIRONMENT") ==
                                "Development";
            var suffix = isDevelopment ? "development" : "production";
            _databaseName = $"blog-{suffix}";
        }

        _container = cosmosClient.GetContainer(_databaseName, "blogPosts");

        _logger = logger;

        _logger.LogDebug("BlogPostRepository will query {Database}", _databaseName);
    }

    public async Task<BlogPost?> GetBySlugAsync(
        string slug,
        CancellationToken cancellationToken)
    {
        var blogPost = await GetBlogPostAsync(slug, cancellationToken);

        if (blogPost is null)
        {
            return null;
        }

        var comments = await GetBlogPostCommentsAsync(slug, cancellationToken);
        foreach (var comment in comments)
        {
            blogPost.AddComment(comment);
        }

        return blogPost;
    }

    public async Task SaveAsync(
        BlogPost blogPost,
        CancellationToken cancellationToken)
    {
        // Quick, dirty and expensive solution for the initial release
        var existingBlogPost = await GetBySlugAsync(blogPost.Slug, cancellationToken);

        var transactionalBatch = _container
           .CreateTransactionalBatch(new PartitionKey(blogPost.Slug));

        if (existingBlogPost is null)
        {
            transactionalBatch.CreateItem(blogPost.ToJsonDto());
        }

        var existingCommentIds = existingBlogPost?.Comments
           .Select(comment => comment.Id)
           .ToHashSet() ?? new HashSet<Guid>();

        var desiredCommentIds = blogPost.Comments
           .Select(comment => comment.Id)
           .ToHashSet();

        var commentsToAdd = blogPost.Comments
           .Where(comment => !existingCommentIds.Contains(comment.Id))
           .Select(comment => comment.ToJsonDto(blogPost))
           .ToList();

        var commentsToDelete = existingBlogPost?.Comments
           .Where(comment => !desiredCommentIds.Contains(comment.Id))
           .Select(comment => comment.ToJsonDto(blogPost))
           .ToList() ?? new List<BlogPostCommentJsonDto>();

        foreach (var commentToAdd in commentsToAdd)
        {
            transactionalBatch.CreateItem(commentToAdd);
        }

        foreach (var commentToDelete in commentsToDelete)
        {
            transactionalBatch.DeleteItem(commentToDelete.Id.ToString());
        }

        using var batchResponse = await transactionalBatch.ExecuteAsync(cancellationToken);
        if (batchResponse.IsSuccessStatusCode)
        {
            return;
        }

        _logger.LogError(
            "Batch update failed with {Error} when saving post {Slug}",
            batchResponse.ErrorMessage,
            blogPost.Slug);

        throw new ApplicationException($"Failed saving post {blogPost.Slug}");
    }

    private async Task<BlogPost?> GetBlogPostAsync(
        string slug,
        CancellationToken cancellationToken)
    {
        try
        {
            var response = await _container
               .ReadItemAsync<BlogPostJsonDto>(
                    slug,
                    new PartitionKey(slug),
                    cancellationToken: cancellationToken);

            var blogPostMaterializationResult = BlogPost.Create(response.Resource.Slug);

            if (blogPostMaterializationResult.IsSuccess)
            {
                return blogPostMaterializationResult.Value;
            }

            _logger.LogError(
                "Failed to materialize post {Slug} from {Dto} due to {Errors}",
                slug,
                response.Resource,
                blogPostMaterializationResult.Errors);

            throw new ApplicationException($"Failed to materialize post {slug}");
        }
        catch (CosmosException cosmosException)
        {
            if (cosmosException.StatusCode == HttpStatusCode.NotFound)
            {
                return null;
            }

            _logger.LogError(
                cosmosException,
                "Fetching Blog Post {Slug} failed",
                slug);

            throw;
        }
    }

    private async Task<IList<BlogPostComment>> GetBlogPostCommentsAsync(
        string slug,
        CancellationToken cancellationToken)
    {
        var getBlogPostCommentsQuery = new QueryDefinition(@$"
                SELECT *
                FROM c
                WHERE c.slug = @slug
                  AND c.type = @type
            ")
           .WithParameter("@slug", slug)
           .WithParameter("@type", BlogPostCommentJsonDto.BlogPostCollectionTypeValue);

        var blogPostComments = new List<BlogPostCommentJsonDto>();
        try
        {
            var query = _container
               .GetItemQueryIterator<BlogPostCommentJsonDto>(getBlogPostCommentsQuery);

            while (query.HasMoreResults)
            {
                var response = await query.ReadNextAsync(cancellationToken);

                if (response is null)
                {
                    return new List<BlogPostComment>();
                }

                blogPostComments.AddRange(response.ToList());
            }
        }
        catch (CosmosException cosmosException)
        {
            if (cosmosException.StatusCode == HttpStatusCode.NotFound)
            {
                return new List<BlogPostComment>();
            }

            _logger.LogError(
                cosmosException,
                "Fetching Blog Post Comments for {Slug} failed",
                slug);

            throw;
        }

        var commentDtoMaterializationResults = blogPostComments
           .Select(blogPostCommentDto => BlogPostComment.Create(
                       blogPostCommentDto.Id,
                       blogPostCommentDto.User,
                       blogPostCommentDto.Text,
                       blogPostCommentDto.PublishedAt))
           .ToList();

        var materializationErrors = commentDtoMaterializationResults
           .Where(result => result.IsFailed)
           .SelectMany(result => result.Errors)
           .ToList();

        if (materializationErrors.Count == 0)
        {
            return commentDtoMaterializationResults
               .Select(result => result.Value)
               .ToList();
        }

        _logger.LogError(
            "Failed to materialize comments on post {Slug} due to {Errors}",
            materializationErrors,
            slug);

        throw new ApplicationException($"Failed to materialize comments on post {slug}");
    }
}