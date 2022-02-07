using FluentResults;

namespace Domain.Errors;

public class DomainRuleViolationError : Error
{
    public DomainRuleViolationError(string violationDescription)
        : base(violationDescription)
    {
    }
}