using AutoMapper;
using College.Application.Exceptions;
using College.Data.Context;
using College.Domain.DTOs;
using College.Domain.Exceptions;
using College.Domain.Models;
using College.Domain.Services;
using College.Shared.Extensions;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace College.Application.Commands.Pages;

public class CreatePageCommand(string title, string content, string url, Guid? subCategoryId, TemplateDto template) : IRequest<PageDto>
{
    public string Title { get; set; } = title;

    public string Content { get; set; } = content;

    public string Url { get; set; } = url;

    public Guid? SubCategoryId { get; set; } = subCategoryId;

    public TemplateDto Template { get; set; } = template;
}

public class CreatePageCommandHandler(CollegeDbContext db, IMapper mapper, ITemplateFactory templateFactory)
    : IRequestHandler<CreatePageCommand, PageDto>
{
    private readonly CollegeDbContext _db = db.ThrowIfNull();
    private readonly IMapper _mapper = mapper.ThrowIfNull();
    private readonly ITemplateFactory _templateFactory = templateFactory.ThrowIfNull();

    public async Task<PageDto> Handle(CreatePageCommand request, CancellationToken cancellationToken)
    {
        if (await _db.Pages.AnyAsync(p =>
            p.SubCategoryId == request.SubCategoryId &&
            string.Equals(p.Url, request.Url, StringComparison.OrdinalIgnoreCase), cancellationToken))
        {
            throw new UrlConflictException(nameof(Page), request.Url);
        }

        var page = new Page
        {
            Title = request.Title,
            Content = request.Content,
            Url = request.Url,
            Template = _templateFactory.Create(request.Template)
        };

        if (request.SubCategoryId.HasValue)
        {
            var subCategory = _db.SubCategories.FirstOrDefault(x => x.Id == request.SubCategoryId.Value)
                ?? throw new EntityNotFoundException(nameof(SubCategory), request.SubCategoryId.Value);

            page.SubCategoryId = request.SubCategoryId.Value;
        }

        await _db.Pages.AddAsync(page, cancellationToken);
        await _db.SaveChangesAsync(cancellationToken);

        return _mapper.Map<PageDto>(page);
    }
}