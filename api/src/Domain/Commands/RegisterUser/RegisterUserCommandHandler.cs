using Domain.Repositories;
using FluentResults;
using Microsoft.Extensions.Logging;

namespace Domain.Commands.RegisterUser;

public class RegisterUserCommandHandler : ICommandHandler<RegisterUserCommand>
{
    private readonly ILogger<RegisterUserCommandHandler> _logger;
    private readonly IUserRepository _userRepository;

    public RegisterUserCommandHandler(
        ILogger<RegisterUserCommandHandler> logger,
        IUserRepository userRepository)
    {
        _logger = logger;
        _userRepository = userRepository;
    }

    public Task<Result> Handle(RegisterUserCommand command, CancellationToken cancellationToken)
    {
        throw new NotImplementedException();
    }
}