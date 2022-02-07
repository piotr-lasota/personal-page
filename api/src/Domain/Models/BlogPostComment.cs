using Domain.Errors;
using FluentResults;

namespace Domain.Models;

public class BlogPostComment
{
    public const int MinimumUserLength = 3;
    public const int MaximumUserLength = 100;

    public const int MinimumCommentLength = 1;
    public const int MaximumCommentLength = 1000;

    private BlogPostComment(
        Guid id,
        string user,
        string text,
        DateTimeOffset publishedAt)
    {
        Id = id;
        User = user;
        Text = text;
        PublishedAt = publishedAt;
    }

    public Guid Id { get; }

    public string User { get; }

    public string Text { get; }

    public DateTimeOffset PublishedAt { get; }

    public static Result<BlogPostComment> Create(
        string user,
        string text,
        DateTimeOffset publishedAt) =>
        Create(Guid.NewGuid(), user, text, publishedAt);

    public static Result<BlogPostComment> Create(
        Guid id,
        string user,
        string text,
        DateTimeOffset publishedAt)
    {
        var errors = new List<IError>();

        switch (user.Length)
        {
            case < MinimumUserLength:
                errors.Add(new DomainRuleViolationError("User too short"));
                break;
            case > MaximumUserLength:
                errors.Add(new DomainRuleViolationError("User too long"));
                break;
        }

        switch (text.Length)
        {
            case < MinimumCommentLength:
                errors.Add(new DomainRuleViolationError("Comment too short"));
                break;
            case > MaximumCommentLength:
                errors.Add(new DomainRuleViolationError("Comment too long"));
                break;
        }

        return errors.Count > 0
            ? new Result<BlogPostComment>().WithErrors(errors)
            : Result.Ok(new BlogPostComment(id, user, text, publishedAt));
    }
}