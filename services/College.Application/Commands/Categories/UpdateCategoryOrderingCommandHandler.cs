using College.Application.Caches;
using College.Data.Context;
using College.Domain.DTOs;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace College.Application.Commands.Categories;

public class UpdateCategoryOrderingCommand(List<UpdateCategoryOrderingDto> orderingDtos) : IRequest
{
    public List<UpdateCategoryOrderingDto> OrderingDtos { get; set; } = orderingDtos;
}

public class UpdateCategoryOrderingCommandHandler(CollegeDbContext db, ICategoryService categoryService) : IRequestHandler<UpdateCategoryOrderingCommand>
{
    public async Task Handle(UpdateCategoryOrderingCommand request, CancellationToken cancellationToken)
    {
        var categoryIds = request.OrderingDtos.Select(dto => dto.CategoryId).ToList();

        var categories = await db.Categories
            .Include(c => c.SubCategories)
                .ThenInclude(sc => sc.Pages)
            .Where(c => categoryIds.Contains(c.Id))
            .ToListAsync(cancellationToken);

        foreach (var categoryDto in request.OrderingDtos)
        {
            var category = categories.FirstOrDefault(c => c.Id == categoryDto.CategoryId);

            if (category == null)
                continue;

            // Update the index of the category
            category.Index = request.OrderingDtos.IndexOf(categoryDto);

            foreach (var subCategoryDto in categoryDto.SubCategories)
            {
                var subCategory = category.SubCategories
                    .FirstOrDefault(sc => sc.Id == subCategoryDto.SubCategoryId);

                if (subCategory == null)
                    continue;

                // Update the index of the subcategory
                subCategory.Index = categoryDto.SubCategories.IndexOf(subCategoryDto);

                foreach (var pageId in subCategoryDto.Pages)
                {
                    var page = subCategory.Pages.FirstOrDefault(p => p.Id == pageId);

                    if (page == null)
                        continue;

                    // Update the index of the page
                    page.Index = subCategoryDto.Pages.IndexOf(pageId);
                }
            }
        }

        await db.SaveChangesAsync(cancellationToken);

        await categoryService.RefreshCategoriesCacheAsync(cancellationToken);
    }
}
