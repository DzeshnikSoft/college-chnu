using College.Data.Context;
using College.Shared.Extensions;
using MediatR;

namespace College.Application.Commands.Image;

public class DeleteImageCommand(Domain.Models.Image image) : IRequest
{
    public Domain.Models.Image Image { get; set; } = image.ThrowIfNull();
}

public class DeleteImageCommandHandler(CollegeDbContext db) : IRequestHandler<DeleteImageCommand>
{
    private readonly CollegeDbContext _db = db;

    public async Task Handle(DeleteImageCommand request, CancellationToken cancellationToken)
    {
        request.ThrowIfNull();
        // TODO: Add image deleting (From File system too).

        _db.Images.Remove(request.Image);
        await _db.SaveChangesAsync(cancellationToken);
    }
}
