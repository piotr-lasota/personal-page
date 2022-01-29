namespace Domain.Commands.DeleteBlogPostComments;

public class DeleteBlogPostCommentsCommand : ICommand
{
    public DeleteBlogPostCommentsCommand(string postSlug, ISet<Guid> commentIds)
    {
        PostSlug = postSlug;
        CommentIds = commentIds;
    }

    public string PostSlug { get; }

    public ISet<Guid> CommentIds { get; }
}