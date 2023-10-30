using System.Net;
using College.API.Exceptions;
using College.API.Extensions;
using College.Domain.Configuration;
using College.Domain.Exceptions;
using College.Domain.Services;
using College.Shared.Exceptions;
using College.Shared.Extensions;
using Microsoft.AspNetCore.Mvc;

namespace College.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class LoginController : ControllerBase
{
     private readonly IAdminService _adminService;
     private readonly ILogger<LoginController> _logger;

     public LoginController(
          ILogger<LoginController> logger,
          IAdminService adminService)
     {
          _adminService = adminService.ThrowIfNull();
          _logger = logger.ThrowIfNull();
     }

     [HttpPost]
     public async Task<ActionResult> PostAsync(CollegeAdmin loginModel)
     {
          try
          {
               var apiKey = await _adminService.LoginAsync(loginModel);

               // Rewrite API KEY
               HttpContext.RemoveApiKey();
               HttpContext.SetApiKey(apiKey);

               return Ok();
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