namespace Domain.Models;

public class BlogPostComment
{
    public BlogPostComment(string user, string text, DateTimeOffset publishedAt)
    {
        User = user;
        Text = text;
        PublishedAt = publishedAt;
    }

    public string User { get; }

    public string Text { get; }

    public DateTimeOffset PublishedAt { get; }
}