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
            transactionalBatch.CreateItem(ToJsonDto(blogPost));
        }

        var existingCommentIds = existingBlogPost?.Comments
           .Select(comment => comment.Id)
           .ToHashSet() ?? new HashSet<Guid>();

        var desiredCommentIds = blogPost.Comments
           .Select(comment => comment.Id)
           .ToHashSet();

        var commentsToAdd = blogPost.Comments
           .Where(comment => !existingCommentIds.Contains(comment.Id))
           .Select(comment => ToJsonDto(blogPost, comment))
           .ToList();

        var commentsToDelete = existingBlogPost?.Comments
           .Where(comment => !desiredCommentIds.Contains(comment.Id))
           .Select(comment => ToJsonDto(blogPost, comment))
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
            "Batch update failed with {Error}",
            batchResponse.ErrorMessage);
    }

    private static BlogPostJsonDto ToJsonDto(BlogPost blogPost)
    {
        return new BlogPostJsonDto
        {
            Slug = blogPost.Slug,
        };
    }

    private static BlogPostCommentJsonDto ToJsonDto(BlogPost blogPost, BlogPostComment comment)
    {
        return new BlogPostCommentJsonDto
        {
            Slug = blogPost.Slug,
            Id = comment.Id,

            PublishedAt = comment.PublishedAt,
            Text = comment.Text,
            User = comment.User,
        };
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

            return new BlogPost(response.Resource.Slug);
        }
        catch (CosmosException cosmosException)
        {
            if (cosmosException.StatusCode != System.Net.HttpStatusCode.NotFound)
            {
                _logger.LogError(
                    cosmosException,
                    "Fetching Blog Post {Slug} failed, pretending it was not found",
                    slug);
            }

            return null;
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
            _logger.LogError(
                cosmosException,
                "Fetching Blog Post Comments for {Slug} failed",
                slug);
            return new List<BlogPostComment>();
        }

        return blogPostComments
           .Select(blogPostCommentDto =>
                       new BlogPostComment(
                           blogPostCommentDto.Id,
                           blogPostCommentDto.User,
                           blogPostCommentDto.Text,
                           blogPostCommentDto.PublishedAt))
           .ToList();
    }
}