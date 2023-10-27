using College.Application.Commands.Pages;
using College.Data.Context;
using College.Domain.Exceptions;
using College.Domain.Models;
using College.Shared.Extensions;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace College.Application.Commands.SubCategories;

public class DeleteSubCategoryCommand : IRequest<Unit>
{
    public DeleteSubCategoryCommand(Guid subCategoryId)
    {
        SubCategoryId = subCategoryId;
    }

    public Guid SubCategoryId { get; set; }
}

public class DeleteSubCategoryCommandHandler : IRequestHandler<DeleteSubCategoryCommand, Unit>
{
    private readonly CollegeDbContext _db;
    private readonly IMediator _mediator;

    public DeleteSubCategoryCommandHandler(CollegeDbContext db, IMediator mediator)
    {
        _mediator = mediator.ThrowIfNull();
        _db = db.ThrowIfNull();
    }

    public async Task<Unit> Handle(DeleteSubCategoryCommand request, CancellationToken cancellationToken)
    {
        var subCategory = await _db.SubCategories
            .Include(s => s.Pages)
            .SingleOrDefaultAsync(s => s.Id == request.SubCategoryId, cancellationToken);

        if (subCategory is null)
        {
            throw new EntityNotFoundException(nameof(SubCategory), request.SubCategoryId);
        }

        // If SubCategory have some pages. We delete this pages!
        if (subCategory.Pages.Any())
        {
            foreach (var pageId in subCategory.Pages.Select(p => p.Id))
            {
                await _mediator.Send(new DeletePageCommand(pageId), cancellationToken);
            }
        }

        _db.SubCategories.Remove(subCategory);
        await _db.SaveChangesAsync(cancellationToken);
        return Unit.Value;
    }
}