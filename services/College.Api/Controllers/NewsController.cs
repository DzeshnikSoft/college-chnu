using College.Application.Queries.News;
using College.Domain.DTOs;
using College.Shared.Extensions;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace College.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class NewsController : ControllerBase
{
    private readonly IMediator _mediator;
    private readonly ILogger<NewsController> _logger;

    public NewsController(IMediator mediator, ILogger<NewsController> logger)
    {
        _logger = logger.ThrowIfNull();
        _mediator = mediator.ThrowIfNull();
    }

    [HttpGet]
    public async Task<ActionResult<IList<NewsDto>>> GetNews()
    {
        _logger.LogInformation("[NewsController] Received request to get all news");
        var news = await _mediator.Send(new GetNewsQuery());

        return Ok(news);
    }
}