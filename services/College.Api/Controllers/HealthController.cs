using College.Data.Context;
using College.Shared.Extensions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace College.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class HealthController(CollegeDbContext db) : ControllerBase
{
    private readonly CollegeDbContext _db = db.ThrowIfNull();

    [HttpGet]
    public async Task<IActionResult> HealthCheckAsync(CancellationToken cancellationToken)
    {
        try
        {
            await _db.Database.ExecuteSqlRawAsync("SELECT 1", cancellationToken);
            return Ok("Did you think I didn't work?\nYou're very wrong, dude.🚀❤️");
        }
        catch (Exception)
        {
            return StatusCode(500, $"Unhealthy");
        }
    }
}