using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Text.Json;
using Microsoft.Azure.Functions.Worker.Http;

namespace Api.Extensions;

public static class HttpRequestDataExtensions
{
    public static ClaimsPrincipal ParseClaimsPrincipal(this HttpRequestData req)
    {
        if (!req.Headers.TryGetValues("x-ms-client-principal", out var header))
        {
            {
                return new ClaimsPrincipal();
            }
        }

        var data = header.FirstOrDefault();
        if (data is null)
        {
            return new ClaimsPrincipal();
        }

        var decoded = Convert.FromBase64String(data);
        var json = Encoding.UTF8.GetString(decoded);
        var principal = JsonSerializer.Deserialize<ClientPrincipal>(
            json,
            new JsonSerializerOptions
            {
                PropertyNameCaseInsensitive = true,
            });

        if (principal is null)
        {
            return new ClaimsPrincipal();
        }

        principal.UserRoles = principal.UserRoles
           .Except(new[] { "anonymous" }, StringComparer.InvariantCultureIgnoreCase)
           .ToList();

        if (!principal.UserRoles.Any())
        {
            return new ClaimsPrincipal();
        }

        var identity = new ClaimsIdentity(principal.IdentityProvider);
        identity.AddClaim(new Claim(ClaimTypes.NameIdentifier, principal.UserId));
        identity.AddClaim(new Claim(ClaimTypes.Name, principal.UserDetails));
        identity.AddClaims(principal.UserRoles.Select(r => new Claim(ClaimTypes.Role, r)));

        return new ClaimsPrincipal(identity);
    }

    private class ClientPrincipal
    {
        public string IdentityProvider { get; set; } = null!;

        public string UserId { get; set; } = null!;

        public string UserDetails { get; set; } = null!;

        public IEnumerable<string> UserRoles { get; set; } = Enumerable.Empty<string>();
    }
}