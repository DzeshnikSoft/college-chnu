using College.Domain.DTOs;
using MediatR;

namespace College.Application.Queries.Pages;

public class GetPagesByCategoriesQuery : IRequest<List<CategoryDto>>
{
    public GetPagesByCategoriesQuery()
    {
    }
}

public class GetPagesByCategoriesQueryHandler : IRequestHandler<GetPagesByCategoriesQuery, List<CategoryDto>>
{
    public async Task<List<CategoryDto>> Handle(GetPagesByCategoriesQuery request, CancellationToken cancellationToken)
    {
        throw new NotImplementedException();
    }
}