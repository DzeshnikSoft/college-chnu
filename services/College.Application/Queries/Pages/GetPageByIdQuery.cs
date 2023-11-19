using College.Data.Context;
using College.Domain.DTOs;
using College.Domain.Exceptions;
using College.Domain.Models;
using College.Shared.Extensions;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace College.Application.Queries.Pages;

public class GetPageByIdQuery : IRequest<PageDto>
{
    public GetPageByIdQuery(Guid pageId)
    {
        PageId = pageId;
    }

    public Guid PageId { get; set; }
}

public class GetPageByIdQueryHandler : IRequestHandler<GetPageByIdQuery, PageDto>
{
    private readonly CollegeDbContext _db;

    public GetPageByIdQueryHandler(CollegeDbContext db)
    {
        _db = db.ThrowIfNull();
    }

    public async Task<PageDto> Handle(GetPageByIdQuery request, CancellationToken cancellationToken)
    {
        var page = await _db.Pages
            .Include(x =>x.Template)
            .ThenInclude(x => x.Image)
            .SingleOrDefaultAsync(p => p.Id == request.PageId, cancellationToken);

        if (page is null)
        {
            throw new EntityNotFoundException(nameof(Page), request.PageId);
        }

        return new PageDto
        {
            Id = page.Id,
            Content = page.Content,
            Title = page.Title,
            Url = page.Url,
        };
    }
}