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

public class GetCategoriesQueryHandler(CollegeDbContext db, IMapper mapper) : IRequestHandler<GetCategoriesQuery, IList<CategoryDto>>
{
    private readonly CollegeDbContext _db = db.ThrowIfNull();
    private readonly IMapper _mapper = mapper.ThrowIfNull();

    public async Task<IList<CategoryDto>> Handle(GetCategoriesQuery request, CancellationToken cancellationToken)
    {
        var categories = await _db.Categories
            .AsSplitQuery()
            .Include(c => c.SubCategories)
            .ThenInclude(x => x.Pages)
            .ThenInclude(x => x.Template)
            .ThenInclude(x => x.Image)
            .ToListAsync(cancellationToken: cancellationToken);

        return _mapper.Map<IList<CategoryDto>>(categories);
    }
}
