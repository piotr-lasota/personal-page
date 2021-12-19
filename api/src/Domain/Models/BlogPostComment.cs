namespace Domain.Models;

public class BlogPostComment
{
    public BlogPostComment(string user, string text)
    {
        User = user;
        Text = text;
    }

    public string User { get; }

    public string Text { get; }
}
