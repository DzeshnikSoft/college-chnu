using College.Application.Exceptions;
using College.Data.Context;
using College.Domain.DTOs;
using College.Domain.Models;
using College.Shared.Extensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace College.Application.Commands.Categories;

public class CreateCategoryCommand(string title, string url) : IRequest<CategoryDto>
{
    public string Title { get; } = title;

    public string? Url { get; } = url.ToLower();
}

public class CreateCategoryCommandHandler(CollegeDbContext db, ILogger<CreateCategoryCommandHandler> logger) : IRequestHandler<CreateCategoryCommand, CategoryDto>
{
    private readonly CollegeDbContext _db = db.ThrowIfNull();
    private readonly ILogger<CreateCategoryCommandHandler> _logger = logger.ThrowIfNull();

    public async Task<CategoryDto> Handle(CreateCategoryCommand request, CancellationToken cancellationToken)
    {
        if (await _db.Categories.AnyAsync(c => c.Title == request.Title, cancellationToken))
        {
            throw new CategoryAlreadyExistExceptions($"Category with title = {request.Title} already exist");
        }

        if (request.Url != null && await _db.Categories.AnyAsync(p => p.Url == request.Url, cancellationToken))
        {
            throw new UrlConflictException(nameof(Category), request.Url);
        }

        var entityEntry = await _db.Categories.AddAsync(new Category
        {
            Title = request.Title,
            Url = request.Url ?? Guid.NewGuid().ToString("N"),
        }, cancellationToken);
        _logger.LogInformation("Successfully created category with ID = {CategoryId}", entityEntry.Entity.Id);

        await _db.SaveChangesAsync(cancellationToken);
        return new CategoryDto
        {
            Title = entityEntry.Entity.Title,
            Id = entityEntry.Entity.Id,
            Url = entityEntry.Entity.Url
        };
    }
}