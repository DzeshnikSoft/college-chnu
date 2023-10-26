using Microsoft.AspNetCore.Mvc;

namespace College.API.Controllers;

[ApiController]
[Route("/api/[controller]")]
public class HeartbeatController : ControllerBase
{
    [HttpGet]
    public IActionResult CheckHeartbeat()
    {
        return Ok("Did you think I didn't work?\nYou're very wrong, dude.🚀❤️");
    }
}