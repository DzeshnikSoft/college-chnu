using College.Application.Caches;
using College.Data.Context;
using College.Domain.Exceptions;
using College.Domain.Models;
using College.Shared.Extensions;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace College.Application.Commands.Pages;

public class DeletePageCommand(Guid pageId) : IRequest<Unit>
{
    public Guid PageId { get; set; } = pageId;
}

public class DeletePageCommandHandler(CollegeDbContext db, ICategoryCacheService categoryCacheService) : IRequestHandler<DeletePageCommand, Unit>
{
    private readonly CollegeDbContext _db = db.ThrowIfNull();
    private readonly ICategoryCacheService _categoryCacheService = categoryCacheService.ThrowIfNull();

    public async Task<Unit> Handle(DeletePageCommand request, CancellationToken cancellationToken)
    {
        var page = await _db.Pages.SingleOrDefaultAsync(p => p.Id == request.PageId, cancellationToken: cancellationToken)
            ?? throw new EntityNotFoundException(nameof(Page), request.PageId);

        _db.Pages.Remove(page);
        await _db.SaveChangesAsync(cancellationToken);

        await _categoryCacheService.RefreshCategoriesCacheAsync(cancellationToken);

        return Unit.Value;
    }
}