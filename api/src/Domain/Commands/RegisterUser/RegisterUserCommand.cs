namespace Domain.Commands.RegisterUser;

public record RegisterUserCommand(
        Guid UserId,
        string DisplayName,
        Guid ProviderGrantedId,
        string ProviderName,
        string ProviderUserDetails)
    : ICommand;