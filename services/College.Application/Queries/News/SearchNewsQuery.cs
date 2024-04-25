using College.Data.Context;
using College.Data.Extensions;
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
        filter.SearchTerm = filter.SearchTerm.Trim();

        var query = _db.News.ToNewsSearchQuery(filter.SearchTerm);

        var totalCount = await query.CountAsync(cancellationToken);
        var pageSize = request.Filter.PageSize ?? totalCount;
        var pageNumber = request.Filter.PageNumber ?? 1;

        var news = await query
            .Skip((pageNumber - 1) * pageSize)
            .Take(pageSize)
            .ToListAsync(cancellationToken);

        var searchResult = news.Select(
            p =>
            {
                var (sentences, highlightedSentences) = !string.IsNullOrWhiteSpace(filter.SearchTerm)
                    ? _textProcessor.FindSentences(string.Join(" ", p.Description, p.TextContent), filter.SearchTerm)
                    : ([], []);

                return new SearchViewModel(
                            p.Id,
                            p.Title,
                            p.Url,
                            sentences,
                            highlightedSentences);
            })
            .ToList();

        if (filter.PageNumber.HasValue && filter.PageSize.HasValue)
            return new Paginator<SearchViewModel>(searchResult, filter.PageNumber.Value, filter.PageSize.Value, news.Count);

        return new Paginator<SearchViewModel>(searchResult);
    }
}

