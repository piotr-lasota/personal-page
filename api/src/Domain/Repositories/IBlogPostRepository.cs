using Domain.Models;

namespace Domain.Repositories;

public interface IBlogPostRepository
{
    Task<BlogPost?> GetBySlugAsync(string slug, CancellationToken cancellationToken);

    Task SaveAsync(BlogPost post, CancellationToken token);
}