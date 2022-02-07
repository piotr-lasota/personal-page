using System.Text.RegularExpressions;

namespace Domain.Models;

public class BlogPost
{
    private static readonly (int min, int max) SlutLengthRange = (3, 100);
    private static readonly Regex SlugRegex = new ("^([a-z0-9-]+)$", RegexOptions.Compiled);

    private readonly List<BlogPostComment> _comments = new ();

    public BlogPost(string slug)
    {
        if (string.IsNullOrWhiteSpace(slug))
        {
            throw new ArgumentException("Slug is mandatory");
        }

        if (slug.Length > SlutLengthRange.max ||
            slug.Length < SlutLengthRange.min)
        {
            throw new ArgumentException(
                $"Slug must be between {SlutLengthRange.min} and {SlutLengthRange.max} characters");
        }

        if (!SlugRegex.IsMatch(slug))
        {
            throw new ArgumentException(
                "Slugs must have a proper sluggish format");
        }

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