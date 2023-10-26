using AutoMapper;
using College.Data.Context;
using College.Domain.DTOs;
using College.Shared.Extensions;
using MediatR;
using Microsoft.EntityFrameworkCore;

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

    public GetPagesQueryHandler(CollegeDbContext db, IMapper mapper)
    {
        _mapper = mapper.ThrowIfNull();
        _db = db.ThrowIfNull();
    }

    public async Task<List<PageDto>> Handle(GetPagesQuery request, CancellationToken cancellationToken)
    {
        var pages = await  _db.Pages.ToListAsync(cancellationToken);

        return _mapper.Map<List<PageDto>>(pages);
    }
}