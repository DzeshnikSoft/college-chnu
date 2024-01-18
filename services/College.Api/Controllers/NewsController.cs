using AutoMapper;
using College.API.ViewModels;
using College.Application.Commands.News;
using College.Application.Queries.News;
using College.Domain.DTOs;
using College.Shared.Extensions;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace College.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class NewsController(IMediator mediator, ILogger<NewsController> logger, IMapper mapper) : ControllerBase
{
    private readonly IMediator _mediator = mediator.ThrowIfNull();
    private readonly ILogger<NewsController> _logger = logger.ThrowIfNull();
    private readonly IMapper _mapper = mapper.ThrowIfNull();

    [HttpGet]
    public async Task<ActionResult<IList<NewsDto>>> GetNews()
    {
        _logger.LogInformation("[NewsController] Received request to get all news");
        var news = await _mediator.Send(new GetNewsQuery());

        return Ok(news);
    }

    /// <summary>
    /// Create news Endpoint
    /// </summary>
    /// <param name="newsViewModel">News info</param>
    /// <returns>New news GUID</returns>
    [HttpPost]
    public async Task<ActionResult<Guid>> CreateNews(NewsViewModel newsViewModel)
    {
        _logger.LogInformation("[NewsController] Received request to create news");
        var newsDto = _mapper.Map<NewsDto>(newsViewModel);

        var newsId = await _mediator.Send(new CreateNewsCommand(newsDto));

        return Ok(newsId);
    }

    /// <summary>
    /// Update News Endpoint
    /// </summary>
    /// <param name="newsDto">News update model</param>
    [HttpPut]
    public async Task<ActionResult<NewsDto>> UpdateNews(NewsDto newsDto)
    {
        _logger.LogInformation("[NewsController] Received request to update news with ID = {NewsId}", newsDto.Id);

        await _mediator.Send(new UpdateNewsCommand(newsDto));
        return Ok();
    }

    [HttpDelete("{newsId}")]
    public async Task<IActionResult> DeleteNewsAsync(Guid newsId)
    {
        await _mediator.Send(new DeleteNewsCommand(newsId));
        return Ok();
    }
}