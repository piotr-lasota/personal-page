namespace DataAccess.Repositories.JsonDtos;

public record BlogPostCommentJsonDto
{
    public const string BlogPostCollectionTypeValue = "blogPostComment";

    public string Type => BlogPostCollectionTypeValue;

    public Guid Id { get; set; }

    public string Slug { get; set; } = string.Empty;

    public string User { get; set; } = string.Empty;

    public string Text { get; set; } = string.Empty;

    public DateTimeOffset PublishedAt { get; set; }
}