namespace Domain.Models;

public class BlogPost
{
    private readonly SortedList<DateTimeOffset, BlogPostComment> _comments = new ();

    public BlogPost(string slug, DateTimeOffset publishingDate)
    {
        Slug = slug;
    }

    public string Slug { get; }

    public IReadOnlyList<BlogPostComment> Comments =>
        _comments.Values
           .Reverse()
           .ToList()
           .AsReadOnly();

    public void AddComment(BlogPostComment comment) => _comments.Add(comment.PublishedAt, comment);
}