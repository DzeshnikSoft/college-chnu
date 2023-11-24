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

public class UpdatePageCommand : IRequest<PageDto>
{
    public UpdatePageCommand(Guid pageId, string title, string url, string content, Guid? subCategoryId, TemplateDto? template)
    {
        PageId = pageId;
        SubCategoryId = subCategoryId;
        Title = title;
        Url = url;
        Content = content;
        Template = template;
    }
    public Guid PageId { get; set; }
    public string? Title { get; set; }
    public string? Url { get; set; }
    public string? Content { get; set; }
    public Guid? SubCategoryId { get; set; }
    public TemplateDto? Template { get; set; }
}

public class UpdatePageCommandHandler : IRequestHandler<UpdatePageCommand, PageDto>
{
    private readonly CollegeDbContext _db;
    private readonly ILogger<UpdatePageCommandHandler> _logger;
    private readonly IMapper _mapper;
    private readonly ITemplateFactory _templateFactory;

    public UpdatePageCommandHandler(
        CollegeDbContext db,
        ILogger<UpdatePageCommandHandler> logger,
        IMapper mapper,
        ITemplateFactory templateFactory)
    {
        _templateFactory = templateFactory;
        _mapper = mapper.ThrowIfNull();
        _logger = logger.ThrowIfNull();
        _db = db.ThrowIfNull();
    }

    public async Task<PageDto> Handle(UpdatePageCommand request, CancellationToken cancellationToken)
    {
        var page = await _db.Pages
            .Include(x => x.Template)
            .ThenInclude(x => x.Image)
            .SingleOrDefaultAsync(
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
            var subCategory = _db.SubCategories.FirstOrDefault(x => x.Id == request.SubCategoryId.Value)
                ?? throw new Exception("SubCategory with this Id is not exist");

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
                page.Template.Image.Url = null;
                page.Template.Image.Alt = null;
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