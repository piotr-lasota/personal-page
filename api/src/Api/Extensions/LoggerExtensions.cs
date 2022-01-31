using System.Linq;
using System.Security.Claims;
using Microsoft.Extensions.Logging;

namespace Api.Extensions;

public static class LoggerExtensions
{
    public static void LogUnauthorizedActivityAttempt<T>(
        this ILogger<T> logger,
        ClaimsPrincipal claimsPrincipal,
        string attemptedActionDescriptionTemplate,
        params object?[] args)
    {
        var provider = claimsPrincipal.Identity?.AuthenticationType;

        var userId = claimsPrincipal
           .FindFirst(claim => claim.Type == ClaimTypes.NameIdentifier)
          ?.Value;

        var name = claimsPrincipal
           .FindFirst(claim => claim.Type == ClaimTypes.Name)
          ?.Value;

        var roles = claimsPrincipal
           .FindAll(claim =>
                        claim.Type != ClaimTypes.Name &&
                        claim.Type != ClaimTypes.NameIdentifier)
           .Select(claim => claim.Value)
           .ToHashSet();

        if (provider is null &&
            userId is null &&
            name is null &&
            roles.Count == 0)
        {
            logger.LogWarning(
                $"{attemptedActionDescriptionTemplate} by an anonymous user",
                args);
        }
        else
        {
            logger.LogWarning(
                $"{attemptedActionDescriptionTemplate} by {{Provider}}, {{UserId}}, {{Name}}, {{Roles}}",
                args
                   .Concat(new[]
                    {
                        provider,
                        userId,
                        name,
                        string.Join(", ", roles),
                    })
                   .ToArray());
        }
    }
}