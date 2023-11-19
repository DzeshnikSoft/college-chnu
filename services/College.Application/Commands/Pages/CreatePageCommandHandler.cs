using AutoMapper;
using College.Data.Context;
using College.Domain.DTOs;
using College.Domain.Models;
using College.Domain.Services;
using College.Shared.Extensions;
using MediatR;

namespace College.Application.Commands.Pages;

public class CreatePageCommand : IRequest<PageDto>
{
    public CreatePageCommand(string title, string content, string url, Guid? subCategoryId, TemplateDto template)
    {
        Title = title;
        Content = content;
        Url = url;
        SubCategoryId = subCategoryId;
        Template = template;
    }

    public string Title { get; set; }

    public string Content { get; set; }

    public string Url { get; set; }

    public Guid? SubCategoryId { get; set; }

    public TemplateDto Template { get; set; }
}

public class CreatePageCommandHandler : IRequestHandler<CreatePageCommand, PageDto>
{
    private readonly CollegeDbContext _db;
    private readonly IMapper _mapper;
    private readonly ITemplateFactory _templateFactory;

    public CreatePageCommandHandler(CollegeDbContext db, IMapper mapper, ITemplateFactory templateFactory)
    {
        _templateFactory = templateFactory.ThrowIfNull();
        _mapper = mapper.ThrowIfNull();
        _db = db.ThrowIfNull();
    }

    public async Task<PageDto> Handle(CreatePageCommand request, CancellationToken cancellationToken)
    {
        var page = new Page
        {
            Title = request.Title,
            Content = request.Content,
            Url = request.Url,
            Template = _templateFactory.Create(request.Template)
        };

        if (request.SubCategoryId.HasValue)
        {
            var subCategory = _db.SubCategories.FirstOrDefault(x => x.Id == request.SubCategoryId.Value);

            if (subCategory is null)
            {
                throw new Exception("SubCategory with this Id is not exist");
            }

            page.SubCategoryId = request.SubCategoryId.Value;
        }

        await _db.Pages.AddAsync(page, cancellationToken);
        await _db.SaveChangesAsync(cancellationToken);

        return _mapper.Map<PageDto>(page);
    }
}