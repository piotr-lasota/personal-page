using FluentResults;

namespace Domain.Commands;

public interface ICommand
{
}

public interface ICommandHandler<in TCommand>
    where TCommand : ICommand
{
    Task<Result> Handle(TCommand command, CancellationToken cancellationToken);
}