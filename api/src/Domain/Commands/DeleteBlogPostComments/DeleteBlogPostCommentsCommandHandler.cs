using Domain.Errors;
using Domain.Models;
using Domain.Repositories;
using FluentResults;

namespace Domain.Commands.DeleteBlogPostComments;

public class DeleteBlogPostCommentsCommandHandler : ICommandHandler<DeleteBlogPostCommentsCommand>
{
    private readonly IBlogPostRepository _blogPostRepository;

    public DeleteBlogPostCommentsCommandHandler(IBlogPostRepository blogPostRepository)
    {
        _blogPostRepository = blogPostRepository;
    }

    public async Task<Result> Handle(
        DeleteBlogPostCommentsCommand command,
        CancellationToken cancellationToken)
    {
        var post = await _blogPostRepository.GetBySlugAsync(command.PostSlug, cancellationToken);

        if (post is null)
        {
            return Result.Fail(new ResourceNotFoundError(typeof(BlogPost)));
        }

        var commentsToDelete = post.Comments
           .Where(comment => command.CommentIds.Contains(comment.Id))
           .ToList();

        if (commentsToDelete.Count != command.CommentIds.Count)
        {
            return Result.Fail(new ResourceNotFoundError(typeof(BlogPostComment)));
        }

        foreach (var commentToDelete in commentsToDelete)
        {
            post.RemoveComment(commentToDelete);
        }

        await _blogPostRepository.SaveAsync(post, cancellationToken);

        return Result.Ok();
    }
}