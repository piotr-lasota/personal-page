namespace Domain.Models;

public class BlogPost
{
    private readonly List<BlogPostComment> _comments = new ();

    public BlogPost(string slug)
    {
        Slug = slug;
    }

    public string Slug { get; }

    public IReadOnlyList<BlogPostComment> Comments =>
        _comments
           .OrderBy(comment => comment.PublishedAt)
           .Reverse()
           .ToList()
           .AsReadOnly();

    public void AddComment(BlogPostComment comment) => _comments.Add(comment);

    public void RemoveComment(BlogPostComment commentToDelete) => _comments.Remove(commentToDelete);
}
