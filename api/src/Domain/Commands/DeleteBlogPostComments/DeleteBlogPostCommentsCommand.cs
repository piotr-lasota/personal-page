namespace Domain.Commands.DeleteBlogPostComments;

public record DeleteBlogPostCommentsCommand(
        string PostSlug,
        ISet<Guid> CommentIds)
    : ICommand;