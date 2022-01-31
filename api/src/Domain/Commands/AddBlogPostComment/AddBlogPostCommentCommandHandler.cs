using Domain.Errors;
using Domain.Models;
using Domain.Repositories;
using FluentResults;
using Microsoft.Extensions.Logging;

namespace Domain.Commands.AddBlogPostComment;

public class AddBlogPostCommentCommandHandler : ICommandHandler<AddBlogPostCommentCommand>
{
    private readonly ILogger<AddBlogPostCommentCommandHandler> _logger;
    private readonly IBlogPostRepository _blogPostRepository;

    public AddBlogPostCommentCommandHandler(
        ILogger<AddBlogPostCommentCommandHandler> logger,
        IBlogPostRepository blogPostRepository)
    {
        _logger = logger;
        _blogPostRepository = blogPostRepository;
    }

    public async Task<Result> Handle(
        AddBlogPostCommentCommand command,
        CancellationToken cancellationToken)
    {
        var post = await _blogPostRepository.GetBySlugAsync(command.PostSlug, cancellationToken);

        if (post is null)
        {
            _logger.LogInformation("No post with slug {Slug} found", command.PostSlug);
            return Result.Fail(new ResourceNotFoundError());
        }

        var comment = new BlogPostComment(
            command.Author,
            command.Text,
            DateTimeOffset.Now);

        post.AddComment(comment);

        await _blogPostRepository.SaveAsync(post, cancellationToken);
        _logger.LogInformation(
            "Successfully added comment by {Author} to {Slug}",
            comment.User,
            post.Slug);

        return Result.Ok();
    }
}