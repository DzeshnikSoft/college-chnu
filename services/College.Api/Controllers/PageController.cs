using College.API.Authentication;
using College.API.Exceptions;
using College.API.ViewModels;
using College.Application.Commands.Pages;
using College.Application.Exceptions;
using College.Application.Queries.Pages;
using College.Domain.DTOs;
using College.Domain.Exceptions;
using College.Shared.Exceptions;
using College.Shared.Extensions;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace College.API.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize(AuthenticationSchemes = ApiKeyAuthenticationExtensions.AuthenticationSchemeName)]
public class PageController(IMediator mediator, ILogger<PageController> logger) : ControllerBase
{
    private readonly IMediator _mediator = mediator.ThrowIfNull();
    private readonly ILogger<PageController> _logger = logger.ThrowIfNull();

    [HttpGet]
    public async Task<ActionResult<List<PageDto>>> GetPagesAsync()
    {
        _logger.LogInformation("Received request to Get All pages");

        return Ok(await _mediator.Send(new GetPagesQuery()));
    }

    [HttpPost]
    public async Task<ActionResult<PageDto>> CreatePageAsync(PageViewModel pageViewModel)
    {
        _logger.LogInformation("Received request to Create page");

        try
        {
            var command = new CreatePageCommand(
            pageViewModel.Title,
            pageViewModel.Content,
            pageViewModel.Url,
            pageViewModel.SubCategoryId,
            new TemplateDto { Type = pageViewModel.Template.Type, Image = pageViewModel.Template.Image, Label = pageViewModel.Template.Label });

            return Ok(
                await _mediator.Send(command));
        }
        catch (UrlConflictException ex)
        {
            throw new ApiException(ex.Message, ApiReasonCodes.UrlAlreadyExist, HttpStatusCode.Conflict);
        }
    }

    [HttpPut]
    public async Task<ActionResult<PageDto>> UpdatePageAsync(UpdatePageViewModel pageViewModel)
    {
        try
        {
            var command = new UpdatePageCommand(
                pageViewModel.Id,
                pageViewModel.Title,
                pageViewModel.Url,
                pageViewModel.Content,
                pageViewModel.SubCategoryId,
                new TemplateDto
                {
                    Type = pageViewModel.Template.Type,
                    Image = new ImageDto
                    {
                        Alt = pageViewModel.Template.Image?.Alt,
                        Url = pageViewModel.Template.Image?.Url
                    },
                    Label = pageViewModel.Template.Label,
                });

            return Ok(await _mediator.Send(command));
        }
        catch (EntityNotFoundException ex)
        {
            throw new ApiException(ex.Message, ApiReasonCodes.EntityNotFound, HttpStatusCode.NotFound);
        }
    }

    [HttpGet("{id:guid}")]
    public async Task<ActionResult<PageDto>> GetPagesAsync(Guid id)
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
            throw new ApiException(ex.Message, ApiReasonCodes.EntityNotFound, HttpStatusCode.NotFound);
        }
    }

    [HttpGet]
    [Route("by-path")]
    public async Task<ActionResult<PageDto>> GetPageByPathAsync([FromQuery] string path)
    {
        if (string.IsNullOrWhiteSpace(path))
        {
            throw new ApiException("Path should be correct", ApiReasonCodes.EntityNotFound, HttpStatusCode.NotFound);
        }

        try
        {
            return Ok(await _mediator.Send(new GetPageByPathQuery(WebUtility.UrlDecode(path))));
        }
        catch (EntityNotFoundException ex)
        {
            throw new ApiException(ex.Message, ApiReasonCodes.EntityNotFound, HttpStatusCode.NotFound);
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
            throw new ApiException(ex.Message, ApiReasonCodes.EntityNotFound, HttpStatusCode.NotFound);
        }
    }
}
