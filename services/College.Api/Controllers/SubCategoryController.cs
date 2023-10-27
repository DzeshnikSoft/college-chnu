using College.API.Exceptions;
using College.API.ViewModels;
using College.Application.Commands.SubCategories;
using College.Domain.DTOs;
using College.Domain.Exceptions;
using College.Shared.Exceptions;
using College.Shared.Extensions;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace College.API.Controllers;

[ApiController]
[Route("/api/[controller]")]
public class SubCategoryController : ControllerBase
{
    private readonly IMediator _mediator;
    private readonly ILogger<SubCategoryController> _logger;

    public SubCategoryController(IMediator mediator, ILogger<SubCategoryController> logger)
    {
        _logger = logger.ThrowIfNull();
        _mediator = mediator.ThrowIfNull();
    }

    [HttpPost]
    public async Task<ActionResult<SubCategoryDto>> CreateSubCategoryAsync(SubCategoryViewModel subCategoryViewModel)
    {
        _logger.LogInformation("Received request to Create new Subcategory with Title = {Title}", subCategoryViewModel.Title);

        try
        {
            return Ok(
                await _mediator.Send(new CreateSubCategoryCommand(subCategoryViewModel.Title, subCategoryViewModel.Url, subCategoryViewModel.CategoryId)));
        }
        catch (EntityNotFoundException ex)
        {
            throw new ApiException(ex.Message, ApiErrorCodes.EntityNotFound, System.Net.HttpStatusCode.NotFound);
        }
    }

    [HttpPut]
    public async Task<ActionResult<SubCategoryDto>> UpdateSubCategoryAsync(UpdateSubCategoryViewModel subCategoryViewModel)
    {
        _logger.LogInformation("Received request to Create new Subcategory with Title = {Title}", subCategoryViewModel.SubCategoryId);

        try
        {
            return Ok(
                await _mediator.Send(new UpdateSubCategoryCommand(subCategoryViewModel.SubCategoryId, subCategoryViewModel.Title, subCategoryViewModel.Url)));
        }
        catch (EntityNotFoundException ex)
        {
            throw new ApiException(ex.Message, ApiErrorCodes.EntityNotFound, System.Net.HttpStatusCode.NotFound);
        }
    }


    [HttpDelete("{id:guid}")]
    public async Task<ActionResult> DeleteSubCategoryAsync(Guid id)
    {
        _logger.LogInformation("Received request to Delete Subcategory with ID = {Id}", id);

        try
        {
            await _mediator.Send(new DeleteSubCategoryCommand(id));
            return Ok();
        }
        catch (EntityNotFoundException ex)
        {
            throw new ApiException(ex.Message, ApiErrorCodes.EntityNotFound, System.Net.HttpStatusCode.NotFound);
        }
    }
}