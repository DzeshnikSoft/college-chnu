using AutoMapper;
using College.Data.Context;
using College.Domain.DTOs;
using College.Domain.Exceptions;
using College.Domain.Models;
using College.Shared.Extensions;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace College.Application.Queries.Pages;

public class GetPageByIdQuery(Guid pageId) : IRequest<PageDto>
{
    public Guid PageId { get; set; } = pageId;
}

public class GetPageByIdQueryHandler(CollegeDbContext db, IMapper mapper) : IRequestHandler<GetPageByIdQuery, PageDto>
{
    private readonly CollegeDbContext _db = db.ThrowIfNull();
    private readonly IMapper _mapper = mapper.ThrowIfNull();

    public async Task<PageDto> Handle(GetPageByIdQuery request, CancellationToken cancellationToken)
    {
        var page = await _db.Pages
            .Include(x => x.Template)
            .ThenInclude(x => x.Image)
            .SingleOrDefaultAsync(p => p.Id == request.PageId, cancellationToken);

        if (page is null)
        {
            throw new EntityNotFoundException(nameof(Page), request.PageId);
        }

        return _mapper.Map<PageDto>(page);
    }
}
