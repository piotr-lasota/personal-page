namespace Domain.Commands.AddBlogPostComment;

public class AddBlogPostCommentCommand : ICommand
{
    public AddBlogPostCommentCommand(
        string slug,
        string author,
        string text)
    {
        PostSlug = slug;
        Author = author;
        Text = text;
    }

    public string PostSlug { get; }

    public string Author { get; }

    public string Text { get; }
}