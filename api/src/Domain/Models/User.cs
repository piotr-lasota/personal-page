using Domain.Errors;
using FluentResults;

namespace Domain.Models;

public class User
{
    public const int MinimumUserDisplayNameLength = 3;
    public const int MaximumUserDisplayNameLength = 50;

    private readonly HashSet<UserIdetity> _identities = new ();

    private User(Guid id, string displayName)
    {
        Id = id;
        DisplayName = displayName;
    }

    public Guid Id { get; }

    public string DisplayName { get; }

    public IReadOnlyList<UserIdetity> Identities => _identities.ToList().AsReadOnly();

    public static Result<User> Create(Guid id, string displayName)
    {
        var errors = new List<IError>();

        if (string.IsNullOrWhiteSpace(displayName))
        {
            errors.Add(new DomainRuleViolationError("Display name must not be empty"));
        }

        if (displayName.Length is < MinimumUserDisplayNameLength or > MaximumUserDisplayNameLength)
        {
            errors.Add(new DomainRuleViolationError(
                $"Display name must be between {MinimumUserDisplayNameLength} and {MaximumUserDisplayNameLength} characters long"));
        }

        if (errors.Any())
        {
            return Result
               .Fail("Unable to create the User")
               .WithErrors(errors);
        }

        return Result.Ok(new User(id, displayName));
    }

    public void RegisterIdentity(UserIdetity identity)
    {
        if (_identities.Contains(identity))
        {
            return;
        }

        _identities.Add(identity);
    }
}