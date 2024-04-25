using College.Domain.Models;
using Microsoft.EntityFrameworkCore;

namespace College.Data.Extensions;

public static class CollegeDbContextExtensions
{
    public static IQueryable<News> ToOrderedNewsSearchQuery(this DbSet<News> newsSet, string searchTerm)
    {
        var query = newsSet
            .AsNoTracking()
            .Include(n => n.Image)
            .Include(n => n.TitleBackgroundImage)
            .OrderByDescending(n => n.Pinned)
            .ThenByDescending(n => n.Date)
            .AsQueryable();

        if (!string.IsNullOrEmpty(searchTerm))
        {
            searchTerm = searchTerm.ToLower().Trim();

            query = query.Where(
                n => n.Title.ToLower().Contains(searchTerm)
                || n.Description.ToLower().Contains(searchTerm)
                || !string.IsNullOrEmpty(n.TextContent) && n.TextContent.ToLower().Contains(searchTerm));
        }

        return query;
    }

    public static IQueryable<News> ToNewsSearchQuery(this DbSet<News> newsSet, string searchTerm)
    {
        var query = newsSet
            .AsNoTracking()
            .OrderByDescending(p => p.CreateDateUtc)
            .AsQueryable();

        if (!string.IsNullOrEmpty(searchTerm))
        {
            searchTerm = searchTerm.ToLower().Trim();

            query = query.Where(
                n => n.Title.ToLower().Contains(searchTerm)
                || n.Description.ToLower().Contains(searchTerm)
                || !string.IsNullOrEmpty(n.TextContent) && n.TextContent.ToLower().Contains(searchTerm));
        }

        return query;
    }
}
