namespace Domain.Models;

public class BlogPostComment
{
    public const int MinimumUserLength = 3;
    public const int MaximumUserLength = 100;

    public const int MinimumCommentLength = 1;
    public const int MaximumCommentLength = 1000;

    public BlogPostComment(
        string user,
        string text,
        DateTimeOffset publishedAt)
        : this(
            Guid.NewGuid(),
            user,
            text,
            publishedAt)
    {
    }

    public BlogPostComment(
        Guid id,
        string user,
        string text,
        DateTimeOffset publishedAt)
    {
        Id = id;
        User = user;
        Text = text;
        PublishedAt = publishedAt;

        switch (user.Length)
        {
            case < MinimumUserLength:
                throw new ArgumentException("User too short", nameof(user));
            case > MaximumUserLength:
                throw new ArgumentException("User too long", nameof(user));
        }

        switch (text.Length)
        {
            case < MinimumCommentLength:
                throw new ArgumentException("Comment too short", nameof(text));
            case > MaximumCommentLength:
                throw new ArgumentException("Comment too long", nameof(text));
        }
    }

    public Guid Id { get; }

    public string User { get; }

    public string Text { get; }

    public DateTimeOffset PublishedAt { get; }
}