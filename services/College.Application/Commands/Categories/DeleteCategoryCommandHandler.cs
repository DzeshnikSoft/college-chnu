using College.Data.Context;
using College.Domain.Exceptions;
using College.Domain.Models;
using College.Shared.Extensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace College.Application.Commands.Categories;

public class DeleteCategoryCommand : IRequest<Unit>
{
    public DeleteCategoryCommand(Guid categoryId)
    {
        CategoryId = categoryId;
    }

    public Guid CategoryId { get; set; }
}

public class DeleteCategoryCommandHandler(CollegeDbContext db, ILogger<DeleteCategoryCommandHandler> logger) : IRequestHandler<DeleteCategoryCommand, Unit>
{
    private readonly CollegeDbContext _db = db.ThrowIfNull();
    private readonly ILogger<DeleteCategoryCommandHandler> _logger = logger.ThrowIfNull();

    public async Task<Unit> Handle(DeleteCategoryCommand request, CancellationToken cancellationToken)
    {
        if (request.CategoryId == default)
        {
            return Unit.Value;
        }

        var category = await _db.Categories.SingleOrDefaultAsync(x => x.Id == request.CategoryId, cancellationToken);

        if (category is null)
        {
            _logger.LogError("Not found Category with ID = {CategoryId}", request.CategoryId);
            throw new EntityNotFoundException(nameof(Category), request.CategoryId);
        }

        _db.Categories.Remove(category);
        await _db.SaveChangesAsync(cancellationToken);

        return Unit.Value;
    }
}