using Microsoft.AspNetCore.Mvc;

namespace College.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AdministrationController : ControllerBase
{
     [HttpGet]
     public IActionResult Get()
     {
          return Ok("Hello");
     }
}