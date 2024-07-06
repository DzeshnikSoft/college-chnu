using College.Data.Context;
using College.Domain.Models;
using College.Domain.Services;
using College.Shared.Extensions;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Memory;

namespace College.Application.Caches;

public interface ICategoryService
{
    Task<IList<Category>> GetCategoriesAsync(CancellationToken cancellationToken = default);

    Task RefreshCategoriesCacheAsync(CancellationToken cancellationToken = default);
}

public class CategoriesCacheService(IMemoryCache memoryCache, CollegeDbContext db)
    : MemoryCacheService<Category>(memoryCache), ICategoryService
{
    private const string CategoriesCacheKey = "categories";
    private readonly CollegeDbContext _db = db.ThrowIfNull();

    public async Task<IList<Category>> GetCategoriesAsync(CancellationToken cancellationToken = default)
    {
        var categories = await GetAllAsync(CategoriesCacheKey);

        if (categories is not null && categories.Count > 0)
        {
            return categories;
        }

        categories = await GetCategoriesFromDBAsync(cancellationToken);

        await SetManyAsync(CategoriesCacheKey, categories);

        return categories;
    }

    public async Task RefreshCategoriesCacheAsync(CancellationToken cancellationToken = default)
    {
        await RemoveAsync(CategoriesCacheKey);

        var categories = await GetCategoriesFromDBAsync(cancellationToken);

        await SetManyAsync(CategoriesCacheKey, categories);
    }

    private async Task<IList<Category>> GetCategoriesFromDBAsync(CancellationToken cancellationToken)
    {
        var categories = await _db.Categories
            .AsNoTracking()
            .Include(c => c.SubCategories)
            .ThenInclude(sc => sc.Pages)
            .OrderBy(c => c.Index)
            .ToListAsync(cancellationToken);

        var subCategoryIds = categories.SelectMany(c => c.SubCategories.Select(sc => sc.Id)).ToList();
        var pageIds = categories.SelectMany(c => c.SubCategories.SelectMany(sc => sc.Pages.Select(p => p.Id))).ToList();

        var subCategories = await _db.SubCategories
            .AsNoTracking()
            .Where(sc => categories.Select(c => c.Id).Contains(sc.CategoryId))
            .OrderBy(sc => sc.Index)
            .ToListAsync(cancellationToken);

        var pages = await _db.Pages
            .AsNoTracking()
            .Where(p => subCategories.Select(sc => sc.Id).Contains(p.SubCategoryId))
            .OrderBy(p => p.Index)
            .ToListAsync(cancellationToken);

        // Assign subcategories and pages to categories
        foreach (var category in categories)
        {
            category.SubCategories = [.. subCategories
                .Where(sc => sc.CategoryId == category.Id)
                .OrderBy(sc => sc.Index)];

            foreach (var subCategory in category.SubCategories)
            {
                subCategory.Pages = [.. pages
                    .Where(p => p.SubCategoryId == subCategory.Id)
                    .OrderBy(p => p.Index)];
            }
        }

        return categories;
    }
}
