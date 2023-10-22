using AutoMapper;
using College.Data.Context;
using College.Domain.DTOs;
using College.Shared.Extensions;
using MediatR;
using Microsoft.Extensions.Logging;

namespace College.Application.Commands.News;

public class CreateNewsCommand : IRequest<Guid>
{
    public CreateNewsCommand(NewsDto newsDto)
    {
        NewsDto = newsDto;
    }

    public NewsDto NewsDto { get; set; }
}

public class CreateNewsCommandHandler : IRequestHandler<CreateNewsCommand, Guid>
{
    private readonly CollegeDbContext _db;
    private readonly ILogger<CreateNewsCommandHandler> _logger;
    private readonly IMapper _mapper;

    public CreateNewsCommandHandler(CollegeDbContext db, ILogger<CreateNewsCommandHandler> logger, IMapper mapper)
    {
        _mapper = mapper.ThrowIfNull();
        _logger = logger.ThrowIfNull();
        _db = db.ThrowIfNull();
    }

    public async Task<Guid> Handle(CreateNewsCommand request, CancellationToken cancellationToken)
    {
        try
        {
            var news = _mapper.Map<Domain.Models.News>(request.NewsDto);

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