namespace DataAccess.Repositories.JsonDtos;

public record BlogPostJsonDto
{
    public const string BlogPostCollectionTypeValue = "blogPost";

    public string Type => BlogPostCollectionTypeValue;

    public string Slug { get; set; } = string.Empty;

    public string Id => Slug;
}