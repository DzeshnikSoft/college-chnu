using AutoMapper;
using College.Application.Caches;
using College.Data.Context;
using College.Domain.DTOs;
using College.Domain.Exceptions;
using College.Domain.Models;
using College.Shared.Extensions;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace College.Application.Commands.SubCategories;

public class UpdateSubCategoryCommand(Guid subCategoryId, string title, string url) : IRequest<SubCategoryDto>
{
    public Guid SubCategoryId { get; set; } = subCategoryId;

    public string? Title { get; set; } = title;

    public string? Url { get; set; } = url;
}

public class UpdateSubCategoryCommandHandler(CollegeDbContext db, IMapper mapper, ICategoryCacheService categoryCacheService) : IRequestHandler<UpdateSubCategoryCommand, SubCategoryDto>
{
    private readonly CollegeDbContext _db = db.ThrowIfNull();
    private readonly IMapper _mapper = mapper.ThrowIfNull();
    private readonly ICategoryCacheService _categoryCacheService = categoryCacheService.ThrowIfNull();

    public async Task<SubCategoryDto> Handle(UpdateSubCategoryCommand request, CancellationToken cancellationToken)
    {
        var subCategory = await _db.SubCategories
            .Include(s => s.Pages)
            .SingleOrDefaultAsync(s => s.Id == request.SubCategoryId, cancellationToken);

        if (subCategory is null)
        {
            throw new EntityNotFoundException(nameof(SubCategory), request.SubCategoryId);
        }

        if (request.Title is not null)
        {
            subCategory.Title = request.Title;
        }
        if (request.Url is not null)
        {
            subCategory.Url = request.Url;
        }

        _db.SubCategories.Update(subCategory);
        await _db.SaveChangesAsync(cancellationToken);

        await _categoryCacheService.RefreshCategoriesCacheAsync(cancellationToken);

        return new SubCategoryDto
        {
            Title = subCategory.Title,
            Id = subCategory.Id,
            Url = subCategory.Url,
            Pages = _mapper.Map<List<PageDto>>(subCategory.Pages),
        };
    }
}