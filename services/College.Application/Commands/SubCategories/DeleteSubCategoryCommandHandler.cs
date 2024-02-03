using College.Application.Caches;
using College.Data.Context;
using College.Domain.Exceptions;
using College.Domain.Models;
using College.Shared.Extensions;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace College.Application.Commands.SubCategories;

public class DeleteSubCategoryCommand(Guid subCategoryId) : IRequest<Unit>
{
    public Guid SubCategoryId { get; set; } = subCategoryId;
}

public class DeleteSubCategoryCommandHandler(CollegeDbContext db, IMediator mediator, ICategoryCacheService categoryCacheService) : IRequestHandler<DeleteSubCategoryCommand, Unit>
{
    private readonly CollegeDbContext _db = db.ThrowIfNull();
    private readonly IMediator _mediator = mediator.ThrowIfNull();
    private readonly ICategoryCacheService _categoryCacheService = categoryCacheService.ThrowIfNull();

    public async Task<Unit> Handle(DeleteSubCategoryCommand request, CancellationToken cancellationToken)
    {
        var subCategory = await _db.SubCategories
            .Include(s => s.Pages)
            .SingleOrDefaultAsync(s => s.Id == request.SubCategoryId, cancellationToken)
            ?? throw new EntityNotFoundException(nameof(SubCategory), request.SubCategoryId);

        _db.Pages.RemoveRange(subCategory.Pages);
        _db.SubCategories.Remove(subCategory);
        await _db.SaveChangesAsync(cancellationToken);

        await _categoryCacheService.RefreshCategoriesCacheAsync(cancellationToken);
        return Unit.Value;
    }
}