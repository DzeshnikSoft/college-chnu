using AutoMapper;
using College.Data.Context;
using College.Domain.DTOs;
using College.Shared.Extensions;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace College.Application.Queries.News;

public class GetNewsQuery(QueryFilterModel queryFilter) : IRequest<PaginationModel<NewsDto>>
{
    public QueryFilterModel QueryFilter { get; set; } = queryFilter;
}

public class GetNewsQueryHandler(CollegeDbContext db, IMapper mapper) : IRequestHandler<GetNewsQuery, PaginationModel<NewsDto>>
{
    private readonly CollegeDbContext _db = db.ThrowIfNull();
    private readonly IMapper _mapper = mapper.ThrowIfNull();

    public async Task<PaginationModel<NewsDto>> Handle(GetNewsQuery request, CancellationToken cancellationToken)
    {
        var query = _db.News
            .AsNoTracking()
            .Include(n => n.Image)
            .Include(n => n.TitleBackgroundImage)
            .OrderByDescending(n => n.Pinned)
            .ThenByDescending(n => n.Date);

        var totalCount = await query.CountAsync(cancellationToken);

        var pageSize = request.QueryFilter.PageSize > 0 ? request.QueryFilter.PageSize : totalCount;
        var pageNumber = request.QueryFilter.PageNumber > 0 ? request.QueryFilter.PageNumber : 1;

        var news = new List<Domain.Models.News>();

        if (!string.IsNullOrEmpty(request.QueryFilter.searchTerm))
        {
            news = await query.Where(n => n.Title.ToLower().Contains(request.QueryFilter.searchTerm.ToLower()) || n.Description.ToLower().Contains(request.QueryFilter.searchTerm.ToLower()))
               .Skip((pageNumber - 1) * pageSize)
               .Take(pageSize)
               .ToListAsync(cancellationToken);
        }
        else
        {
            news = await query.Skip((pageNumber - 1) * pageSize)
               .Take(pageSize)
               .ToListAsync(cancellationToken);
        }

        return new PaginationModel<NewsDto>(_mapper.Map<IList<NewsDto>>(news), pageNumber, pageSize, totalCount);
    }
}