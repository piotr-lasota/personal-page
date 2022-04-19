using Domain.Errors;
using Domain.Models;
using Domain.Repositories;
using FluentResults;
using Microsoft.Extensions.Logging;

namespace Domain.Queries.GetUser;

public class GetUserQueryHandler : IQueryHandler<GetUserQuery, User>
{
    private readonly ILogger<GetUserQueryHandler> _logger;
    private readonly IUserRepository _userRepository;

    public GetUserQueryHandler(
        ILogger<GetUserQueryHandler> logger,
        IUserRepository userRepository)
    {
        _logger = logger;
        _userRepository = userRepository;
    }

    public async Task<Result<User>> Handle(GetUserQuery query, CancellationToken cancellationToken)
    {
        var user = await _userRepository.GetByIdAsync(query.UserId, cancellationToken);
        if (user is null)
        {
            _logger.LogInformation("No User with id {UserId} found", query.UserId);
            return Result.Fail(new ResourceNotFoundError());
        }

        _logger.LogInformation("Returning user {UserId}", user.Id);
        return Result.Ok(user);
    }
}