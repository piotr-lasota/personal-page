namespace Domain.Models;

// TODO: Figure out some less Azure SWA-auth-derived way to do this.
public record UserIdetity(
    Guid Id,
    string ProviderName,
    string UserDetails);