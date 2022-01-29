using Domain.Errors;
using Domain.Models;
using Domain.Repositories;
using FluentResults;

namespace Domain.Queries.GetBlogPostComments;

public class GetBlogPostCommentsQueryHandler
    : IQueryHandler<GetBlogPostCommentsQuery, IReadOnlyList<BlogPostComment>>
{
    private readonly IBlogPostRepository _blogPostRepository;

    public GetBlogPostCommentsQueryHandler(
        IBlogPostRepository blogPostRepository)
    {
        _blogPostRepository = blogPostRepository;
    }

    public async Task<Result<IReadOnlyList<BlogPostComment>>> Handle(
        GetBlogPostCommentsQuery query,
        CancellationToken cancellationToken)
    {
        var post = await _blogPostRepository.GetBySlugAsync(query.PostSlug, CancellationToken.None);

        if (post is null)
        {
            return Result.Fail(new ResourceNotFoundError());
        }

        return Result.Ok(post.Comments);
    }
}