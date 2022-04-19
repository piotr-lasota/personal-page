using Domain.Models;

namespace DataAccess.Repositories.JsonDtos;

internal static class ModelExtensions
{
    public static BlogPostJsonDto ToJsonDto(this BlogPost blogPost)
    {
        return new BlogPostJsonDto
        {
            Slug = blogPost.Slug,
        };
    }

    public static BlogPostCommentJsonDto ToJsonDto(this BlogPostComment comment, BlogPost blogPost)
    {
        return new BlogPostCommentJsonDto
        {
            Slug = blogPost.Slug,
            Id = comment.Id,

            PublishedAt = comment.PublishedAt,
            Text = comment.Text,
            User = comment.User,
        };
    }
}