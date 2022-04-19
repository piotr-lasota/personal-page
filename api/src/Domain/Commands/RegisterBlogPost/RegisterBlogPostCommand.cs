namespace Domain.Commands.RegisterBlogPost;

public record RegisterBlogPostCommand(
        string Slug)
    : ICommand;