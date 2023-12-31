using AutoMapper;
using College.Data.Context;
using College.Domain.DTOs;
using College.Shared.Extensions;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace College.Application.Queries.News;

public class GetNewsQuery : IRequest<IList<NewsDto>>
{
}

public class GetNewsQueryHandler(CollegeDbContext db, IMapper mapper) : IRequestHandler<GetNewsQuery, IList<NewsDto>>
{
    private readonly CollegeDbContext _db = db.ThrowIfNull();
    private readonly IMapper _mapper = mapper.ThrowIfNull();

    public async Task<IList<NewsDto>> Handle(GetNewsQuery request, CancellationToken cancellationToken)
    {
        var news = await _db.News.ToListAsync(cancellationToken);

        return news.Count == 0
            ? new List<NewsDto>()
            : _mapper.Map<IList<NewsDto>>(news);
    }
}