using Domain.Models;

namespace Domain.Queries.GetBlogPostComments;

public class GetBlogPostCommentsQuery : IQuery<IReadOnlyList<BlogPostComment>>
{
    public GetBlogPostCommentsQuery(string slug)
    {
        PostSlug = slug;
    }

    public string PostSlug { get; }
}