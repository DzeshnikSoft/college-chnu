using College.Data.Context;
using College.Domain.DTOs;
using College.Domain.Exceptions;
using College.Domain.Models;
using College.Shared.Extensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace College.Application.Commands.SubCategories;

public class CreateSubCategoryCommand : IRequest<SubCategoryDto>
{
    public CreateSubCategoryCommand(string title, string url, Guid categoryId)
    {
        Title = title;
        Url = url;
        CategoryId = categoryId;
    }

    public string Title { get; }

    public string Url { get; }

    public Guid CategoryId { get; }
}

public class CreateSubCategoryCommandHandler : IRequestHandler<CreateSubCategoryCommand, SubCategoryDto>
{
    private readonly CollegeDbContext _db;
    private readonly ILogger<CreateSubCategoryCommandHandler> _logger;

    public CreateSubCategoryCommandHandler(CollegeDbContext db, ILogger<CreateSubCategoryCommandHandler> logger)
    {
        _logger = logger.ThrowIfNull();
        _db = db.ThrowIfNull();
    }

    public async Task<SubCategoryDto> Handle(CreateSubCategoryCommand request, CancellationToken cancellationToken)
    {
        if (!await _db.Categories.AnyAsync(c => c.Id == request.CategoryId, cancellationToken))
        {
            throw new EntityNotFoundException(nameof(Category), request.CategoryId);
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
        return new SubCategoryDto
        {
            Id = id,
            Title = subCategory.Title,
            Url = subCategory.Url,
        };
    }
}