using College.Application.Exceptions;
using College.Data.Context;
using College.Domain.DTOs;
using College.Domain.Models;
using College.Shared.Extensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace College.Application.Commands.Categories;

public class CreateCategoryCommand : IRequest<CategoryDto>
{
    public CreateCategoryCommand(string title, string url)
    {
        Title = title;
        Url = url;
    }

    public string Title { get; }

    public string? Url { get; }
}

public class CreateCategoryCommandHandler : IRequestHandler<CreateCategoryCommand, CategoryDto>
{
    private readonly CollegeDbContext _db;
    private readonly ILogger<CreateCategoryCommandHandler> _logger;

    public CreateCategoryCommandHandler(CollegeDbContext db, ILogger<CreateCategoryCommandHandler> logger)
    {
        _logger = logger.ThrowIfNull();
        _db = db.ThrowIfNull();
    }

    public async Task<CategoryDto> Handle(CreateCategoryCommand request, CancellationToken cancellationToken)
    {
        if (await _db.Categories.AnyAsync(
                c => c.Title == request.Title, cancellationToken))
        {
            throw new CategoryAlreadyExistExceptions($"Category with title = {request.Title} already exist");
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