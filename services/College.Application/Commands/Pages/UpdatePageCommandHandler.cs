using AutoMapper;
using College.Data.Context;
using College.Domain.DTOs;
using College.Domain.Enumerations;
using College.Domain.Exceptions;
using College.Domain.Models;
using College.Domain.Services;
using College.Shared.Extensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace College.Application.Commands.Pages;

public class UpdatePageCommand(Guid pageId, string title, string url, string content, Guid? subCategoryId, TemplateDto? template)
    : IRequest<PageDto>
{
    public Guid PageId { get; set; } = pageId;
    public string? Title { get; set; } = title;
    public string? Url { get; set; } = url;
    public string? Content { get; set; } = content;
    public Guid? SubCategoryId { get; set; } = subCategoryId;
    public TemplateDto? Template { get; set; } = template;
}

public class UpdatePageCommandHandler(
    CollegeDbContext db,
    ILogger<UpdatePageCommandHandler> logger,
    IMapper mapper,
    ITemplateFactory templateFactory) : IRequestHandler<UpdatePageCommand, PageDto>
{
    private readonly CollegeDbContext _db = db.ThrowIfNull();
    private readonly ILogger<UpdatePageCommandHandler> _logger = logger.ThrowIfNull();
    private readonly IMapper _mapper = mapper.ThrowIfNull();
    private readonly ITemplateFactory _templateFactory = templateFactory;

    public async Task<PageDto> Handle(UpdatePageCommand request, CancellationToken cancellationToken)
    {
        var page = await _db.Pages
            .Include(x => x.Template)
            .ThenInclude(x => x.Image)
            .SingleOrDefaultAsync(
            p => p.Id == request.PageId, cancellationToken)
            ?? throw new EntityNotFoundException(nameof(Page), request.PageId);

        if (request.Title is not null)
        {
            page.Title = request.Title;
        }
        if (request.SubCategoryId.HasValue)
        {
            var subCategory = _db.SubCategories.FirstOrDefault(x => x.Id == request.SubCategoryId.Value)
                ?? throw new EntityNotFoundException(nameof(SubCategory), request.SubCategoryId.Value);

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

        if (request.Template is not null)
        {
            page.Template.Type = request.Template.Type;

            if (request.Template.Type == TemplateType.Default)
            {
                page.Template.Image = null;
                page.Template.Title = null;
            }
            else
            {
                page.Template = _templateFactory.Create(request.Template);
            }
        }

        _db.Pages.Update(page);
        await _db.SaveChangesAsync(cancellationToken);

        return _mapper.Map<PageDto>(page);
    }
}