using Domain.Models;

namespace Domain.Queries.GetBlogPostComments;

public record GetBlogPostCommentsQuery(
        string PostSlug)
    : IQuery<IReadOnlyList<BlogPostComment>>;