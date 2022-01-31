using Domain.Errors;
using Domain.Repositories;
using FluentResults;
using Microsoft.Extensions.Logging;

namespace Domain.Commands.DeleteBlogPostComments;

public class DeleteBlogPostCommentsCommandHandler : ICommandHandler<DeleteBlogPostCommentsCommand>
{
    private readonly ILogger<DeleteBlogPostCommentsCommandHandler> _logger;
    private readonly IBlogPostRepository _blogPostRepository;

    public DeleteBlogPostCommentsCommandHandler(
        ILogger<DeleteBlogPostCommentsCommandHandler> logger,
        IBlogPostRepository blogPostRepository)
    {
        _logger = logger;
        _blogPostRepository = blogPostRepository;
    }

    public async Task<Result> Handle(
        DeleteBlogPostCommentsCommand command,
        CancellationToken cancellationToken)
    {
        var post = await _blogPostRepository.GetBySlugAsync(command.PostSlug, cancellationToken);

        if (post is null)
        {
            _logger.LogInformation("No post with slug {Slug} found", command.PostSlug);
            return Result.Fail(new ResourceNotFoundError());
        }

        var commentsToDelete = post.Comments
           .Where(comment => command.CommentIds.Contains(comment.Id))
           .ToList();

        if (commentsToDelete.Count != command.CommentIds.Count)
        {
            var missedCommentIds = command.CommentIds
               .Except(post.Comments.Select(comment => comment.Id))
               .ToHashSet();

            _logger.LogInformation(
                "Comments {CommentIds} were not found on post {Slug}",
                missedCommentIds,
                command.PostSlug);

            return Result.Fail(new ResourceNotFoundError());
        }

        foreach (var commentToDelete in commentsToDelete)
        {
            post.RemoveComment(commentToDelete);
        }

        await _blogPostRepository.SaveAsync(post, cancellationToken);

        _logger.LogInformation(
            "Successfully removed comments {CommentIds} from post {Slug}",
            command.CommentIds,
            command.PostSlug);

        return Result.Ok();
    }
}