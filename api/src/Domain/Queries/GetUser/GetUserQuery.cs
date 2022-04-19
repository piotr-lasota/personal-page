using Domain.Models;

namespace Domain.Queries.GetUser;

public record GetUserQuery(
        Guid UserId)
    : IQuery<User>;