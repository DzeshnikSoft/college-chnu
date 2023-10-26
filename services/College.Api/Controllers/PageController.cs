using College.API.Exceptions;
using College.Application.Commands.Pages;
using College.Application.Queries.Pages;
using College.Domain.DTOs;
using College.Domain.Exceptions;
using College.Shared.Exceptions;
using College.Shared.Extensions;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace College.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PageController : ControllerBase
{
    private readonly IMediator _mediator;
    private readonly ILogger<PageController> _logger;

    public PageController(IMediator mediator, ILogger<PageController> logger)
    {
        _logger = logger.ThrowIfNull();
        _mediator = mediator.ThrowIfNull();
    }

    [HttpGet]
    public async Task<ActionResult<List<PageDto>>> GetPagesAsync()
    {
        _logger.LogInformation("Received request to Get All pages");

        return Ok(await _mediator.Send(new GetPagesQuery()));
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<List<PageDto>>> GetPagesAsync(Guid id)
    {
        _logger.LogInformation("Received request to Get page Id = {Id}", id);

        if (id == default)
        {
            throw new ValidationException(nameof(GetPagesAsync), nameof(id), $"Invalid Id. Please input valid value!");
        }

        try
        {
            return Ok(await _mediator.Send(new GetPageByIdQuery(id)));
        }
        catch (EntityNotFoundException ex)
        {
            throw new ApiException(ex.Message, ApiErrorCodes.EntityNotFound, System.Net.HttpStatusCode.NotFound);
        }
    }

    [HttpDelete("{id:guid}")]
    public async Task<ActionResult> DeletePageAsync(Guid id)
    {
        _logger.LogInformation("Received request to Delete page with ID = {Id}", id);

        if (id == default)
        {
            throw new ValidationException(nameof(DeletePageAsync), nameof(id), $"Invalid Id. Please input valid value!");
        }

        try
        {
            await _mediator.Send(new DeletePageCommand(id));

            return Ok();
        }
        catch (EntityNotFoundException ex)
        {
            throw new ApiException(ex.Message, ApiErrorCodes.EntityNotFound, System.Net.HttpStatusCode.NotFound);
        }
    }
}