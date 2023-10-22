using AutoMapper;
using College.Data.Context;
using College.Domain.DTOs;
using College.Shared.Extensions;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace College.Application.Queries.Categories;

public class GetCategoriesQuery : IRequest<IList<CategoryDto>>
{
}

public class GetCategoriesQueryHandler : IRequestHandler<GetCategoriesQuery, IList<CategoryDto>>
{
    private readonly CollegeDbContext _db;
    private readonly IMapper _mapper;

    public GetCategoriesQueryHandler(CollegeDbContext db, IMapper mapper)
    {
        _mapper = mapper.ThrowIfNull();
        _db = db.ThrowIfNull();
    }

    public async Task<IList<CategoryDto>> Handle(GetCategoriesQuery request, CancellationToken cancellationToken)
    {
        var categories = await _db.Categories
            .AsSplitQuery()
            .Include(c => c.SubCategories)
            .ThenInclude(x => x.Pages)
            .ToListAsync(cancellationToken: cancellationToken);

        return _mapper.Map<IList<CategoryDto>>(categories);
    }
}