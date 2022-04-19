using Domain.Models;

namespace Domain.Repositories;

public interface IUserRepository
{
    Task SaveAsync(User user, CancellationToken cancellationToken = default);

    Task<User?> GetByIdAsync(Guid userId, CancellationToken cancellationToken = default);
}