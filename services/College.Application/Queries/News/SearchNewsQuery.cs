using College.Data.Context;
using College.Domain.DTOs;
using College.Domain.Services;
using College.Shared.Extensions;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace College.Application.Queries.News;

public class SearchNewsQuery(QueryFilterModel filter) : IRequest<Paginator<SearchViewModel>>
{
    public QueryFilterModel Filter { get; set; } = filter;
}

internal class SearchNewsQueryHandler(CollegeDbContext db, ITextProcessor textProcessor) : IRequestHandler<SearchNewsQuery, Paginator<SearchViewModel>>
{
    private readonly CollegeDbContext _db = db.ThrowIfNull();
    private readonly ITextProcessor _textProcessor = textProcessor.ThrowIfNull();

    public async Task<Paginator<SearchViewModel>> Handle(SearchNewsQuery request, CancellationToken cancellationToken)
    {
        var filter = request.Filter;

        var query = string.IsNullOrWhiteSpace(filter.SearchTerm)
            ? _db.News.OrderByDescending(p => p.CreateDateUtc)
            : _db.News
            .Where(p => p.Title.ToLower().Contains(filter.SearchTerm.ToLower()) || (!string.IsNullOrEmpty(p.TextContent) && p.TextContent.ToLower().Contains(filter.SearchTerm.ToLower())))
            .OrderByDescending(p => p.CreateDateUtc);

        var newsQuery = filter.PageNumber.HasValue && filter.PageSize.HasValue
            ? query.Skip((filter.PageNumber.Value - 1) * filter.PageSize.Value).Take(filter.PageSize.Value)
            : query;

        var news = await newsQuery.ToListAsync(cancellationToken);

        var searchResult = news.Select(
            p =>
            {
                var (sentences, highlightedSentences) = !string.IsNullOrWhiteSpace(filter.SearchTerm)
                    ? _textProcessor.FindSentences(p.TextContent, filter.SearchTerm)
                    : ([], []);

                return new SearchViewModel(
                            p.Id,
                            p.Title,
                            p.Url,
                            highlightedSentences,
                            sentences);
            })
            .ToList();

        return new Paginator<SearchViewModel>(searchResult);
    }
}

