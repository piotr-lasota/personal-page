using FluentResults;

namespace Domain.Errors;

public class ResourceNotFoundError : Error
{
    public ResourceNotFoundError()
    {
    }

    public ResourceNotFoundError(Type resourceType)
    {
        ResourceType = resourceType;
    }

    public Type? ResourceType { get; }
}