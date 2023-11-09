using College.Application.Commands.Files;
using College.Shared.Extensions;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace College.API.Controllers;

[ApiController]
[Route("file")]
public class UploadFileController : ControllerBase
{
    private readonly IMediator _mediator;
    private readonly ILogger<UploadFileController> _logger;

    public UploadFileController(IMediator mediator, ILogger<UploadFileController> logger)
    {
        _logger = logger.ThrowIfNull();
        _mediator = mediator.ThrowIfNull();
    }

    [HttpPost]
    public async Task<string> UploadFileAsync(string fileName, IFormFile? file)
    {
        if (file is null || file.Length == 0)
        {
            throw new Exception("");
        }

        var name = string.IsNullOrEmpty(fileName) ? Path.GetFileName(file.Name) : $"{fileName}{Path.GetExtension(file.FileName)}";
        _logger.LogInformation("Name = {Name}, extension = {FileName}", name, file.FileName);
        var bytes = await GetFileBytesAsync(file);
        return await _mediator.Send(
            new UploadFileToHostCommand(name, bytes));
    }

    private async Task<byte[]> GetFileBytesAsync(IFormFile file)
    {
        using var memoryStream = new MemoryStream();

        await file.CopyToAsync(memoryStream);
        return memoryStream.ToArray();
    }
}

