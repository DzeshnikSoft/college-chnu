using College.Data.Context;
using College.Domain.DTOs;
using College.Domain.Exceptions;
using College.Domain.Models;
using College.Shared.Extensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace College.Application.Commands.Categories;

public class UpdateCategoryCommand(Guid categoryId, string? url, string? title) : IRequest<CategoryDto>
{
    public Guid CategoryId { get; set; } = categoryId;

    public string? Url { get; set; } = url;

    public string? Title { get; set; } = title;
}


public class UpdateCategoryCommandHandler(ILogger<UpdateCategoryCommandHandler> logger, CollegeDbContext db)
    : IRequestHandler<UpdateCategoryCommand, CategoryDto>
{
    private readonly ILogger<UpdateCategoryCommandHandler> _logger = logger.ThrowIfNull();
    private readonly CollegeDbContext _db = db.ThrowIfNull();

    public async Task<CategoryDto> Handle(UpdateCategoryCommand request, CancellationToken cancellationToken)
    {
        request.CategoryId.ThrowIfNull();

        var category = await _db.Categories.SingleOrDefaultAsync(c => c.Id == request.CategoryId, cancellationToken);

        if (category is null)
        {
            _logger.LogError("Not found Category with ID = {CategoryId}", request.CategoryId);
            throw new EntityNotFoundException(nameof(Category), request.CategoryId);
        }

        if (request.Url is not null)
        {
            category.Url = request.Url;
        }
        if (request.Title is not null)
        {
            category.Title = request.Title;
        }

        _db.Categories.Update(category);
        await _db.SaveChangesAsync(cancellationToken);

        return new CategoryDto
        {
            Id = category.Id,
            Url = category.Url,
            Title = request.Title,
        };
    }
}
