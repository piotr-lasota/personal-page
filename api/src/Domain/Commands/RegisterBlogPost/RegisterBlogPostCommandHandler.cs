using Domain.Models;
using Domain.Repositories;
using Domain.Successes;
using FluentResults;
using Microsoft.Extensions.Logging;

namespace Domain.Commands.RegisterBlogPost;

public class RegisterBlogPostCommandHandler : ICommandHandler<RegisterBlogPostCommand>
{
    private readonly ILogger<RegisterBlogPostCommandHandler> _logger;
    private readonly IBlogPostRepository _blogPostRepository;

    public RegisterBlogPostCommandHandler(
        ILogger<RegisterBlogPostCommandHandler> logger,
        IBlogPostRepository blogPostRepository)
    {
        _logger = logger;
        _blogPostRepository = blogPostRepository;
    }

    public async Task<Result> Handle(
        RegisterBlogPostCommand command,
        CancellationToken cancellationToken)
    {
        var postAlreadyExists = await _blogPostRepository.GetBySlugAsync(
                command.Slug,
                cancellationToken)
            is not null;

        if (postAlreadyExists)
        {
            _logger.LogInformation(
                "Blog post {Slug} was already registered",
                command.Slug);

            return Result.Ok().WithSuccess<AlreadyExisted>();
        }

        var newBlogPost = new BlogPost(command.Slug);

        await _blogPostRepository.SaveAsync(newBlogPost, cancellationToken);

        _logger.LogInformation(
            "Successfully registered post {Slug}",
            command.Slug);

        return Result.Ok().WithSuccess<SuccessfullyCreated>();
    }
}