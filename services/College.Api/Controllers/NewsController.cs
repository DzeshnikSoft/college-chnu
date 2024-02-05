using System.Net;
using AutoMapper;
using College.API.Exceptions;
using College.API.ViewModels;
using College.Application.Commands.News;
using College.Application.Exceptions;
using College.Application.Queries.News;
using College.Domain.DTOs;
using College.Shared.Exceptions;
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
    public async Task<ActionResult<PaginationModel<NewsDto>>> GetNews([FromQuery] QueryFilterModel queryFilter)
    {
        _logger.LogInformation("[NewsController] Received request to get all news");
        var news = await _mediator.Send(new GetNewsQuery(queryFilter));

        return Ok(news);
    }

    [HttpGet("{newsId:guid}")]
    public async Task<ActionResult<NewsDto>> GetNewsById(Guid newsId)
    {
        _logger.LogInformation("[NewsController] Received request to get news by id = {NewsId}", newsId);

        return Ok(await _mediator.Send(new GetNewsByIdQuery(newsId)));
    }

    /// <summary>
    /// Create news Endpoint
    /// </summary>
    /// <param name="newsViewModel">News info</param>
    /// <returns>New news GUID</returns>
    [HttpPost]
    public async Task<ActionResult<Guid>> CreateNews(NewsViewModel newsViewModel)
    {
        try
        {
            _logger.LogInformation("[NewsController] Received request to create news");
            var newsDto = _mapper.Map<NewsDto>(newsViewModel);

            var newsId = await _mediator.Send(new CreateNewsCommand(newsDto));

            return Ok(newsId);
        }
        catch (UrlConflictException ex)
        {
            throw new ApiException(ex.Message, ApiReasonCodes.UrlAlreadyExist, HttpStatusCode.Conflict);
        }
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