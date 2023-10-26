using AutoMapper;
using College.Data.Context;
using College.Domain.DTOs;
using College.Domain.Models;
using College.Shared.Extensions;
using MediatR;

namespace College.Application.Commands.Pages;

public class CreatePageCommand : IRequest<PageDto>
{
    public CreatePageCommand(string title, string content, string url, Guid? subCategoryId)
    {
        Title = title;
        Content = content;
        Url = url;
        SubCategoryId = subCategoryId;
    }

    public string Title { get; set; }

    public string Content { get; set; }

    public string Url { get; set; }

    public Guid? SubCategoryId { get; set; }
}

public class CreatePageCommandHandler : IRequestHandler<CreatePageCommand, PageDto>
{
    private readonly CollegeDbContext _db;
    private readonly IMapper _mapper;

    public CreatePageCommandHandler(CollegeDbContext db, IMapper mapper)
    {
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
        };

        if (request.SubCategoryId.HasValue)
        {
            page.SubCategoryId = request.SubCategoryId.Value;
        }

        await _db.Pages.AddAsync(page, cancellationToken);
        await _db.SaveChangesAsync(cancellationToken);

        return _mapper.Map<PageDto>(page);
    }
}