using College.API.Authentication;
using College.API.Exceptions;
using College.API.ViewModels;
using College.Application.Commands.Categories;
using College.Application.Exceptions;
using College.Application.Queries.Categories;
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
[Route("/api/[controller]")]
[Authorize(AuthenticationSchemes = ApiKeyAuthenticationExtensions.AuthenticationSchemeName)]
public class CategoriesController(ILogger<CategoriesController> logger, IMediator mediator) : ControllerBase
{
    private readonly ILogger<CategoriesController> _logger = logger.ThrowIfNull();
    private readonly IMediator _mediator = mediator.ThrowIfNull();

    [HttpGet]
    public async Task<ActionResult<IList<CategoryDto>>> GetCategoriesAsync(CancellationToken cancellationToken)
    {
        _logger.LogInformation("Received request to get all categories");

        return Ok(await _mediator.Send(new GetCategoriesQuery(), cancellationToken));
    }

    [HttpPost]
    public async Task<ActionResult<CategoryDto>> CreateCategoryAsync(CategoryViewModel categoryViewModel, CancellationToken cancellationToken)
    {
        _logger.LogInformation("Received request to create new category = {Title}", categoryViewModel.Title);

        if (string.IsNullOrEmpty(categoryViewModel.Title))
        {
            throw new ValidationException(nameof(CreateCategoryAsync), nameof(categoryViewModel.Title), $"Invalid Title. Please input valid value!");
        }
        try
        {
            return Ok(await _mediator.Send(new CreateCategoryCommand(categoryViewModel.Title, categoryViewModel.Url), cancellationToken));
        }
        catch (UrlConflictException ex)
        {
            throw new ApiException(ex.Message, ApiReasonCodes.UrlAlreadyExist, HttpStatusCode.Conflict);
        }
    }

    [HttpPut]
    public async Task<ActionResult<CategoryDto>> UpdateCategoryAsync(UpdateCategoryViewModel categoryViewModel, CancellationToken cancellationToken)
    {
        _logger.LogInformation("Received request to update category = {CategoryId}", categoryViewModel.CategoryId);

        try
        {
            return Ok(
                await _mediator.Send(new UpdateCategoryCommand(categoryViewModel.CategoryId, categoryViewModel.Url, categoryViewModel.Title), cancellationToken));
        }
        catch (UrlConflictException ex)
        {
            throw new ApiException(ex.Message, ApiReasonCodes.UrlAlreadyExist, HttpStatusCode.Conflict);
        }
        catch (EntityNotFoundException ex)
        {
            throw new ApiException(ex.Message, ApiReasonCodes.EntityNotFound, System.Net.HttpStatusCode.NotFound);
        }
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult> DeleteCategoryAsync(Guid id, CancellationToken cancellationToken)
    {
        _logger.LogInformation("Received request to delete category = {CategoryId}", id);

        if (id == default)
        {
            throw new ValidationException(nameof(DeleteCategoryAsync), nameof(id), $"Invalid Id. Please input valid value!");
        }

        await _mediator.Send(new DeleteCategoryCommand(id), cancellationToken);

        return Ok();
    }

    [HttpPut("ordering")]
    public async Task<ActionResult> UpdateCategoriesOrderingAsync(List<UpdateCategoryOrderingDto> categoryOrderings, CancellationToken cancellationToken)
    {
        await _mediator.Send(new UpdateCategoryOrderingCommand(categoryOrderings), cancellationToken);

        return Ok();
    }
}