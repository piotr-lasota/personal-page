using Domain.Errors;
using Domain.Models;
using Domain.Repositories;
using FluentResults;
using Microsoft.Extensions.Logging;

namespace Domain.Queries.GetBlogPostComments;

public class GetBlogPostCommentsQueryHandler
    : IQueryHandler<GetBlogPostCommentsQuery, IReadOnlyList<BlogPostComment>>
{
    private readonly ILogger<GetBlogPostCommentsQueryHandler> _logger;
    private readonly IBlogPostRepository _blogPostRepository;

    public GetBlogPostCommentsQueryHandler(
        ILogger<GetBlogPostCommentsQueryHandler> logger,
        IBlogPostRepository blogPostRepository)
    {
        _logger = logger;
        _blogPostRepository = blogPostRepository;
    }

    public async Task<Result<IReadOnlyList<BlogPostComment>>> Handle(
        GetBlogPostCommentsQuery query,
        CancellationToken cancellationToken)
    {
        var post = await _blogPostRepository.GetBySlugAsync(query.PostSlug, CancellationToken.None);

        if (post is null)
        {
            _logger.LogInformation("No post with slug {Slug} found", query.PostSlug);
            return Result.Fail(new ResourceNotFoundError());
        }

        _logger.LogInformation(
            "Returning {NumberOfComments} comments for post {Slug}",
            post.Comments.Count,
            post.Slug);
        return Result.Ok(post.Comments);
    }
}