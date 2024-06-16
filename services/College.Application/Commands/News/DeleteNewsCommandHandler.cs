using College.Application.Commands.Categories;
using College.Application.Commands.Image;
using College.Data.Context;
using College.Domain.Exceptions;
using College.Shared.Extensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace College.Application.Commands.News;

public class DeleteNewsCommand(Guid newsId) : IRequest
{
    public Guid NewsId { get; set; } = newsId;
}

public class DeleteNewsCommandHandler(CollegeDbContext db, ILogger<DeleteCategoryCommandHandler> logger, IMediator mediator) : IRequestHandler<DeleteNewsCommand>
{
    private readonly CollegeDbContext _db = db.ThrowIfNull();
    private readonly ILogger<DeleteCategoryCommandHandler> _logger = logger.ThrowIfNull();
    private readonly IMediator _mediator = mediator.ThrowIfNull();

    public async Task Handle(DeleteNewsCommand request, CancellationToken cancellationToken)
    {
        var news = await _db.News
            .Include(n => n.Image)
            .Include(n => n.TitleBackgroundImage)
            .SingleOrDefaultAsync(n => n.Id == request.NewsId, cancellationToken)
            ?? throw new EntityNotFoundException(nameof(News), request.NewsId);

        if (news.Image != null)
        {
            await _mediator.Send(new DeleteImageCommand(news.Image), cancellationToken);
        }
        if (news.TitleBackgroundImage != null)
        {
            await _mediator.Send(new DeleteImageCommand(news.TitleBackgroundImage), cancellationToken);
        }

        _db.News.Remove(news);
        await _db.SaveChangesAsync(cancellationToken);
    }
}
