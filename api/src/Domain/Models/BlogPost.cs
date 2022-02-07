using System.Text.RegularExpressions;
using Domain.Errors;
using FluentResults;

namespace Domain.Models;

public class BlogPost
{
    private static readonly (int min, int max) SlutLengthRange = (3, 100);
    private static readonly Regex SlugRegex = new ("^([a-z0-9-]+)$", RegexOptions.Compiled);

    private readonly List<BlogPostComment> _comments = new ();

    private BlogPost(string slug)
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

    public static Result<BlogPost> Create(string slug)
    {
        var errors = new List<IError>();
        if (string.IsNullOrWhiteSpace(slug))
        {
            errors.Add(
                new DomainRuleViolationError(
                    "Slug is mandatory"));
        }

        if (slug.Length > SlutLengthRange.max ||
            slug.Length < SlutLengthRange.min)
        {
            errors.Add(
                new DomainRuleViolationError(
                    $"Slug must be between {SlutLengthRange.min} and {SlutLengthRange.max} characters"));
        }

        if (!SlugRegex.IsMatch(slug))
        {
            errors.Add(
                new DomainRuleViolationError(
                    "Slugs must have a proper sluggish format"));
        }

        return errors.Count > 0
            ? new Result<BlogPost>().WithErrors(errors)
            : Result.Ok(new BlogPost(slug));
    }

    public Result AddComment(BlogPostComment comment)
    {
        _comments.Add(comment);
        return Result.Ok();
    }

    public Result RemoveComment(BlogPostComment commentToDelete)
    {
        return _comments.Remove(commentToDelete)
            ? Result.Ok()
            : Result.Fail(
                new Error("Failed to remove comment")
                   .WithMetadata("commentId", commentToDelete.Id));
    }
}