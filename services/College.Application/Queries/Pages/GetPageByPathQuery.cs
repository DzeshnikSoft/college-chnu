using AutoMapper;
using College.Data.Context;
using College.Domain.DTOs;
using College.Domain.Exceptions;
using College.Domain.Models;
using College.Shared.Extensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace College.Application.Queries.Pages;

public class GetPageByPathQuery : IRequest<PageDto>
{
    public GetPageByPathQuery(string path)
    {
        Path = path;
    }

    public string Path { get; set; }
}

public class GetPageByPathCommandHandler : IRequestHandler<GetPageByPathQuery, PageDto>
{
    private readonly ILogger<GetPageByPathCommandHandler> _logger;
    private readonly CollegeDbContext _db;
    private readonly IMapper _mapper;

    public GetPageByPathCommandHandler(ILogger<GetPageByPathCommandHandler> logger, CollegeDbContext db, IMapper mapper)
    {
        _mapper = mapper.ThrowIfNull();
        _db = db.ThrowIfNull();
        _logger = logger.ThrowIfNull();
    }

    public async Task<PageDto> Handle(GetPageByPathQuery request, CancellationToken cancellationToken)
    {
        var (categoryPath, subCategoryPath, pagePath) = GetPathSections(request.Path);

        var page = await _db.Pages
            .Include(x => x.Template)
            .ThenInclude(x => x.Image)
            .Include(p => p.SubCategory)
            .ThenInclude(sc => sc!.Category)
            .FirstOrDefaultAsync(p =>
                    p.SubCategory != null &&
                    p.SubCategory.Category != null &&
                    p.SubCategory.Url == subCategoryPath &&
                    p.SubCategory.Category.Url == categoryPath &&
                    p.Url == pagePath,
                cancellationToken);

        if (page is null)
        {
            _logger.LogWarning("Page by path = {PagePath} not found", request.Path);
            throw new EntityNotFoundException(nameof(Page), request.Path);
        }

        return _mapper.Map<PageDto>(page);
    }

    private (string categoryPath, string subCategoryPath, string pagePath) GetPathSections(string path)
    {
        var pathSections = path.Split('/');

        var categoryPath = "";
        var subCategoryPath = "";
        var pagePath = "";

        if (pathSections.Length >= 1)
        {
            categoryPath = pathSections[0];
        }
        if (pathSections.Length >= 2)
        {
            subCategoryPath = pathSections[1];
        }
        if (pathSections.Length >= 3)
        {
            pagePath = pathSections[2];
        }

        return (categoryPath, subCategoryPath, pagePath);
    }
}