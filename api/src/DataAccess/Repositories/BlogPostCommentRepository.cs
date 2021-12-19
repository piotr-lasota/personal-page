using Domain.Models;
using Domain.Repositories;

namespace DataAccess.Repositories;

public class BlogPostCommentRepository : IBlogPostCommentRepository
{
    public async Task<IList<BlogPostComment>?> GetAllForPost(string slug, CancellationToken cancellationToken)
    {
        await Task.Delay(500, cancellationToken);
        
        if (slug == "non-existing-post")
        {
            return null;
        }

        return new List<BlogPostComment>
        {
            new ("johnDoe123", "OMG Great post, so much true!"),
            new ("One And Only Bill Gates", "Dude, awesome stuff, come join M$!"),
        };
    }
}