using College.Application.Caches;
using College.Application.Exceptions;
using College.Data.Context;
using College.Domain.DTOs;
using College.Domain.Exceptions;
using College.Domain.Models;
using College.Shared.Extensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace College.Application.Commands.SubCategories;

public class CreateSubCategoryCommand(string title, string url, Guid categoryId) : IRequest<SubCategoryDto>
{
    public string Title { get; } = title;

    public string Url { get; } = url.ToLower();

    public Guid CategoryId { get; } = categoryId;
}

public class CreateSubCategoryCommandHandler(CollegeDbContext db, ILogger<CreateSubCategoryCommandHandler> logger, ICategoryCacheService categoryCacheService) : IRequestHandler<CreateSubCategoryCommand, SubCategoryDto>
{
    private readonly CollegeDbContext _db = db.ThrowIfNull();
    private readonly ILogger<CreateSubCategoryCommandHandler> _logger = logger.ThrowIfNull();
    private readonly ICategoryCacheService _categoryCacheService = categoryCacheService.ThrowIfNull();

    public async Task<SubCategoryDto> Handle(CreateSubCategoryCommand request, CancellationToken cancellationToken)
    {
        if (!await _db.Categories.AnyAsync(c => c.Id == request.CategoryId, cancellationToken))
        {
            throw new EntityNotFoundException(nameof(Category), request.CategoryId);
        }

        if (await _db.SubCategories.AnyAsync(p => p.CategoryId == request.CategoryId && p.Url == request.Url, cancellationToken))
        {
            throw new UrlConflictException(nameof(SubCategory), request.Url);
        }

        var subCategory = new SubCategory
        {
            Title = request.Title,
            Url = request.Url,
            CategoryId = request.CategoryId,
        };

        var id = (await _db.SubCategories.AddAsync(subCategory, cancellationToken)).Entity.Id;
        await _db.SaveChangesAsync(cancellationToken);

        _logger.LogInformation("Successfully created new SubCategory with id = {SubCategoryId}", id);

        await _categoryCacheService.RefreshCategoriesCacheAsync(cancellationToken);

        return new SubCategoryDto
        {
            Id = id,
            Title = subCategory.Title,
            Url = subCategory.Url,
        };
    }
}