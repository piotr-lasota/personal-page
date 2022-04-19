namespace DataAccess.Repositories.JsonDtos;

internal record BlogPostJsonDto
{
    public const string BlogPostCollectionTypeValue = "blogPost";

    public string Slug { get; set; } = string.Empty;

    public string Id => Slug;
}