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

public class GetPagesQueryHandler(CollegeDbContext db, IMapper mapper, ILogger<GetPagesQueryHandler> logger)
    : IRequestHandler<GetPagesQuery, List<PageDto>>
{
    private readonly CollegeDbContext _db = db.ThrowIfNull();
    private readonly IMapper _mapper = mapper.ThrowIfNull();
    private readonly ILogger<GetPagesQueryHandler> _logger = logger;

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