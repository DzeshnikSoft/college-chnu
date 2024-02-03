using AutoMapper;
using College.Application.Caches;
using College.Domain.DTOs;
using College.Shared.Extensions;
using MediatR;

namespace College.Application.Queries.Categories;

public class GetCategoriesQuery : IRequest<IList<CategoryDto>>
{
}

public class GetCategoriesQueryHandler(IMapper mapper, ICategoryCacheService categoryCachedService) : IRequestHandler<GetCategoriesQuery, IList<CategoryDto>>
{
    private readonly IMapper _mapper = mapper.ThrowIfNull();
    private readonly ICategoryCacheService _categoryCachedService = categoryCachedService.ThrowIfNull();

    public async Task<IList<CategoryDto>> Handle(GetCategoriesQuery request, CancellationToken cancellationToken)
    {
        var categories = await _categoryCachedService.GetCategoriesAsync(cancellationToken);

        return _mapper.Map<IList<CategoryDto>>(categories);
    }
}
