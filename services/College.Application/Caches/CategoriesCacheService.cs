using College.Data.Context;
using College.Domain.Models;
using College.Domain.Services;
using College.Shared.Extensions;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Memory;

namespace College.Application.Caches;

public interface ICategoryCacheService
{
    Task<IList<Category>> GetCategoriesAsync(CancellationToken cancellationToken = default);

    Task RefreshCategoriesCacheAsync(CancellationToken cancellationToken = default);
}

public class CategoriesCacheService(IMemoryCache memoryCache, CollegeDbContext db)
    : MemoryCacheService<Category>(memoryCache), ICategoryCacheService
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
        return await _db.Categories
            .AsSplitQuery()
            .Include(c => c.SubCategories)
                .ThenInclude(x => x.Pages)
            .Select(c => new Category
            {
                Id = c.Id,
                Title = c.Title,
                Url = c.Url,
                SubCategories = c.SubCategories.Select(sc => new SubCategory
                {
                    Id = sc.Id,
                    Title = sc.Title,
                    Url = sc.Url,
                    CategoryId = c.Id,
                    Pages = sc.Pages.Select(p => new Page
                    {
                        Id = p.Id,
                        Url = p.Url,
                        Title = p.Title,
                        SubCategoryId = sc.Id,
                    }).ToList()
                }).ToList()
            })
            .ToListAsync(cancellationToken: cancellationToken);
    }
}
