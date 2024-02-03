using AutoMapper;
using College.Data.Context;
using College.Domain.DTOs;
using College.Domain.Exceptions;
using College.Shared.Extensions;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace College.Application.Queries.News;

public class GetNewsByIdQuery(Guid newsId) : IRequest<NewsDto>
{
    public Guid NewsId { get; set; } = newsId.ThrowIfNull();
}

public class GetNewsByIdQueryHandler(CollegeDbContext db, IMapper mapper) : IRequestHandler<GetNewsByIdQuery, NewsDto>
{
    private readonly CollegeDbContext _db = db.ThrowIfNull();
    private readonly IMapper _mapper = mapper.ThrowIfNull();

    public async Task<NewsDto> Handle(GetNewsByIdQuery request, CancellationToken cancellationToken)
    {
        var news = await _db.News
            .AsNoTracking()
            .Include(n => n.Image)
            .Include(n => n.TitleBackgroundImage)
            .SingleOrDefaultAsync(n => n.Id == request.NewsId, cancellationToken)
            ?? throw new EntityNotFoundException(nameof(News), request.NewsId);

        return _mapper.Map<NewsDto>(news);
    }
}
