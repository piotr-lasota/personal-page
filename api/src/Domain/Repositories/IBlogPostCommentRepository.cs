using Domain.Models;

namespace Domain.Repositories;

public interface IBlogPostCommentRepository
{
    Task<IList<BlogPostComment>?> GetAllForPost(
        string slug,
        CancellationToken cancellationToken);
}