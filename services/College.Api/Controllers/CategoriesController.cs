using College.API.Exceptions;
using College.API.ViewModels;
using College.Application.Commands.Categories;
using College.Application.Queries.Categories;
using College.Domain.DTOs;
using College.Shared.Extensions;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace College.API.Controllers;

[ApiController]
[Route("/api/[controller]")]
public class CategoriesController : ControllerBase
{
    private readonly ILogger<CategoriesController> _logger;
    private readonly IMediator _mediator;

    public CategoriesController(ILogger<CategoriesController> logger, IMediator mediator)
    {
        _logger = logger.ThrowIfNull();
        _mediator = mediator.ThrowIfNull();
    }

    [HttpGet]
    public async Task<ActionResult<IList<CategoryDto>>> GetCategories()
    {
        _logger.LogInformation("Received request to get all categories");

        return Ok(await _mediator.Send(new GetCategoriesQuery()));
    }

    [HttpPost]
    public async Task<ActionResult<CategoryDto>> CreateCategory(CategoryViewModel categoryViewModel)
    {
        _logger.LogInformation("Received request to create new category = {Title}", categoryViewModel.Title);

        if (string.IsNullOrEmpty(categoryViewModel.Title))
        {
            throw new ValidationException(nameof(CreateCategory),nameof(categoryViewModel.Title), $"Invalid Title. Please input valid value!");
        }

        return Ok(await _mediator.Send(
            new CreateCategoryCommand(categoryViewModel.Title, categoryViewModel.Url)));
    }
}