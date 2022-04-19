namespace Domain.Commands.AddBlogPostComment;

public record AddBlogPostCommentCommand(
        string PostSlug,
        string Author,
        string Text)
    : ICommand;