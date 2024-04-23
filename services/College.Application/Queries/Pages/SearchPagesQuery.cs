using College.Data.Context;
using College.Domain.DTOs;
using College.Domain.Services;
using College.Shared.Extensions;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace College.Application.Queries.Pages;

public class SearchPagesQuery(QueryFilterModel filter) : IRequest<Paginator<SearchViewModel>>
{
    public QueryFilterModel Filter { get; set; } = filter;
}

internal class SearchPagesQueryHandler(CollegeDbContext db, ITextProcessor textProcessor) : IRequestHandler<SearchPagesQuery, Paginator<SearchViewModel>>
{
    private readonly CollegeDbContext _db = db.ThrowIfNull();
    private readonly ITextProcessor _textProcessor = textProcessor.ThrowIfNull();

    public async Task<Paginator<SearchViewModel>> Handle(SearchPagesQuery request, CancellationToken cancellationToken)
    {
        var filter = request.Filter;

        var query = string.IsNullOrWhiteSpace(filter.SearchTerm)
            ? _db.Pages.OrderByDescending(p => p.CreateDateUtc)
            : _db.Pages
            .Where(p => p.Title.ToLower().Contains(filter.SearchTerm.ToLower()) || (!string.IsNullOrEmpty(p.TextContent) && p.TextContent.ToLower().Contains(filter.SearchTerm.ToLower())))
            .Include(p => p.SubCategory)
            .ThenInclude(p => p.Category)
            .OrderByDescending(p => p.CreateDateUtc);

        var pagesQuery = filter.PageNumber.HasValue && filter.PageSize.HasValue
            ? query.Skip((filter.PageNumber.Value - 1) * filter.PageSize.Value).Take(filter.PageSize.Value)
            : query;

        var pages = await pagesQuery.ToListAsync(cancellationToken);

        var searchResult = pages.Select(
            p =>
            {
                var (sentences, highlightedSentences) = !string.IsNullOrWhiteSpace(filter.SearchTerm)
                    ? _textProcessor.FindSentences(p.TextContent, filter.SearchTerm)
                    : ([], []);

                return new SearchViewModel(
                            p.Id,
                            p.Title,
                            $"/{p.SubCategory.Category.Url}/{p.SubCategory.Url}/{p.Url}",
                            sentences,
                            highlightedSentences);
            })
            .ToList();

        return new Paginator<SearchViewModel>(searchResult);
    }
}
