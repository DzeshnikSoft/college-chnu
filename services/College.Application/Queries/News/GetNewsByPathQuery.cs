using AutoMapper;
using College.Data.Context;
using College.Domain.DTOs;
using College.Domain.Exceptions;
using College.Shared.Extensions;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace College.Application.Queries.News;

public class GetNewsByPathQuery(string url) : IRequest<NewsDto>
{
    public string Url { get; set; } = url;
}

public class GetNewsByPathQueryHandler(CollegeDbContext db, IMapper mapper) : IRequestHandler<GetNewsByPathQuery, NewsDto>
{
    private readonly CollegeDbContext _db = db.ThrowIfNull();
    private readonly IMapper _mapper = mapper.ThrowIfNull();

    public async Task<NewsDto> Handle(GetNewsByPathQuery request, CancellationToken cancellationToken)
    {
        if (string.IsNullOrEmpty(request.Url))
            throw new ArgumentNullException(nameof(request.Url));

        var news = await _db.News
            .Include(n => n.Image)
            .FirstOrDefaultAsync(
                n => n.Url.ToLower() == request.Url.ToLower(), cancellationToken: cancellationToken)

            ?? throw new EntityNotFoundException(nameof(News), request.Url);

        return _mapper.Map<NewsDto>(news);
    }
}
