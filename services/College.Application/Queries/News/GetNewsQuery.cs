using College.Data.Context;
using College.Domain.DTOs;
using College.Shared.Extensions;
using MediatR;

namespace College.Application.Queries.News;

public class GetNewsQuery : IRequest<IList<NewsDto>>
{
}

public class GetNewsQueryHandler : IRequestHandler<GetNewsQuery, IList<NewsDto>>
{
    private readonly CollegeDbContext _db;

    public GetNewsQueryHandler(CollegeDbContext db)
    {
        _db = db.ThrowIfNull();
    }

    public async Task<IList<NewsDto>> Handle(GetNewsQuery request, CancellationToken cancellationToken)
    {
        throw new NotImplementedException();
    }
}