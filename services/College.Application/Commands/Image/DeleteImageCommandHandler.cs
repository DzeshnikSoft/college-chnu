using MediatR;

namespace College.Application.Commands.Image;

public class DeleteImageCommand(Domain.Models.Image image) : IRequest
{
    public Domain.Models.Image Image { get; set; } = image;
}

public class DeleteImageCommandHandler : IRequestHandler<DeleteImageCommand>
{
    public async Task Handle(DeleteImageCommand request, CancellationToken cancellationToken)
    {
        // TODO: Add image deleting (From File system too).
        await Task.CompletedTask;
    }
}
