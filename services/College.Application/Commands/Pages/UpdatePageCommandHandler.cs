using AutoMapper;
using College.Data.Context;
using College.Domain.DTOs;
using College.Domain.Exceptions;
using College.Domain.Models;
using College.Shared.Extensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace College.Application.Commands.Pages;

public class UpdatePageCommand(Guid pageId, string title, string url, string content, Guid? subCategoryId)
    : IRequest<PageDto>
{
    public Guid PageId { get; set; } = pageId;
    public string? Title { get; set; } = title;
    public string? Url { get; set; } = url;
    public string? Content { get; set; } = content;
    public Guid? SubCategoryId { get; set; } = subCategoryId;
}

public class UpdatePageCommandHandler : IRequestHandler<UpdatePageCommand, PageDto>
{
    private readonly CollegeDbContext _db;
    private readonly ILogger<UpdatePageCommandHandler> _logger;
    private readonly IMapper _mapper;

    public UpdatePageCommandHandler(CollegeDbContext db, ILogger<UpdatePageCommandHandler> logger, IMapper mapper)
    {
        _mapper = mapper.ThrowIfNull();
        _logger = logger.ThrowIfNull();
        _db = db.ThrowIfNull();
    }

    public async Task<PageDto> Handle(UpdatePageCommand request, CancellationToken cancellationToken)
    {
        var page = await _db.Pages.SingleOrDefaultAsync(
            p => p.Id == request.PageId, cancellationToken);

        if (page is null)
        {
            throw new EntityNotFoundException(nameof(Page), request.PageId);
        }

        if (request.Title is not null)
        {
            page.Title = request.Title;
        }
        if (request.SubCategoryId.HasValue)
        {
            page.SubCategoryId = request.SubCategoryId.Value;
        }
        if (request.Content is not null)
        {
            page.Content = request.Content;
        }
        if (request.Url is not null)
        {
            page.Url = request.Url;
        }

        _db.Pages.Update(page);
        await _db.SaveChangesAsync(cancellationToken);

        return _mapper.Map<PageDto>(page);
    }
}