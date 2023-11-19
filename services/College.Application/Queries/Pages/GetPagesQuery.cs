using AutoMapper;
using College.Data.Context;
using College.Domain.DTOs;
using College.Shared.Extensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace College.Application.Queries.Pages;

public class GetPagesQuery : IRequest<List<PageDto>>
{
    public GetPagesQuery()
    {
    }
}

public class GetPagesQueryHandler : IRequestHandler<GetPagesQuery, List<PageDto>>
{
    private readonly CollegeDbContext _db;
    private readonly IMapper _mapper;
    private readonly ILogger<GetPagesQueryHandler> _logger;

    public GetPagesQueryHandler(CollegeDbContext db, IMapper mapper, ILogger<GetPagesQueryHandler> logger)
    {
        _logger = logger;
        _mapper = mapper.ThrowIfNull();
        _db = db.ThrowIfNull();
    }

    public async Task<List<PageDto>> Handle(GetPagesQuery request, CancellationToken cancellationToken)
    {
        var pages = await _db.Pages
            .AsSplitQuery()
            .Include(x => x.Template)
            .ThenInclude(x => x.Image)
            .ToListAsync(cancellationToken);

        return _mapper.Map<List<PageDto>>(pages);
    }
}