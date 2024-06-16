using AutoMapper;
using College.Application.Exceptions;
using College.Data.Context;
using College.Domain.DTOs;
using College.Shared.Extensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace College.Application.Commands.News;

public class CreateNewsCommand(NewsDto newsDto) : IRequest<Guid>
{
    public NewsDto NewsDto { get; set; } = newsDto;
}

public class CreateNewsCommandHandler(CollegeDbContext db, ILogger<CreateNewsCommandHandler> logger, IMapper mapper) : IRequestHandler<CreateNewsCommand, Guid>
{
    private readonly CollegeDbContext _db = db.ThrowIfNull();
    private readonly ILogger<CreateNewsCommandHandler> _logger = logger.ThrowIfNull();
    private readonly IMapper _mapper = mapper.ThrowIfNull();

    public async Task<Guid> Handle(CreateNewsCommand request, CancellationToken cancellationToken)
    {
        try
        {
            var news = _mapper.Map<Domain.Models.News>(request.NewsDto);

            news.Url ??= Guid.NewGuid().ToString("N");

            if ((await _db.News.AnyAsync(n => n.Url == news.Url, cancellationToken: cancellationToken)))
            {
                throw new UrlConflictException(nameof(News), news.Url);
            }

            var newsEntityEntry = await _db.News.AddAsync(news, cancellationToken);
            await _db.SaveChangesAsync(cancellationToken);

            _logger.LogInformation("Successfully created news with ID = {NewsId}", newsEntityEntry.Entity.Id);

            return newsEntityEntry.Entity.Id;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Something happened when try creating News");
            throw;
        }
    }
}