using College.API.Exceptions;
using College.API.Extensions;
using College.API.ViewModels;
using College.Domain.Configuration;
using College.Domain.Exceptions;
using College.Domain.Services;
using College.Shared.Exceptions;
using College.Shared.Extensions;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace College.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class LoginController(
      ILogger<LoginController> logger,
      IAdminService adminService) : ControllerBase
{
    private readonly IAdminService _adminService = adminService.ThrowIfNull();
    private readonly ILogger<LoginController> _logger = logger.ThrowIfNull();

    [HttpPost]
    public async Task<ActionResult> PostAsync(CollegeAdmin loginModel)
    {
        try
        {
            var apiKey = await _adminService.LoginAsync(loginModel);

            return Ok(new ApiKeyResponse(apiKey));
        }
        catch (NotAuthorizedException ex)
        {
            _logger.LogError(ex, "Something happened during login");
            throw new ApiException(ex.Message, ApiReasonCodes.IncorrectAdminLoginOrPassword, HttpStatusCode.BadRequest);
        }
    }

    [HttpGet("logout")]
    public async Task<ActionResult> LogoutAsync()
    {
        await Task.CompletedTask;
        HttpContext.RemoveApiKey();

        return Ok();
    }
}