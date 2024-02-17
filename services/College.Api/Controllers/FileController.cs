using College.Application.Commands.Files;
using College.Application.Exceptions;
using College.Application.Queries.Files;
using College.Domain.Settings;
using College.Shared.Extensions;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace College.API.Controllers;

[ApiController]
[Route("files")]
public class FileController(IMediator mediator, ILogger<FileController> logger, FileStorageSettings fileStorageSettings) : ControllerBase
{
    private readonly IMediator _mediator = mediator.ThrowIfNull();
    private readonly ILogger<FileController> _logger = logger.ThrowIfNull();
    private readonly FileStorageSettings _fileStorageSettings = fileStorageSettings;

    [HttpGet("images/{fileName}")]
    public async Task<FileContentResult> GetImage(string fileName)
    {
        if (string.IsNullOrWhiteSpace(fileName))
        {
            throw new FileIncorrectPathException("File should have valid path");
        }

        return await ReadAndGetFileAsync(Path.Combine("images", fileName), "image/jpeg");
    }

    [HttpGet("{fileName}")]
    public async Task<FileContentResult> GetFile(string fileName)
    {
        if (string.IsNullOrWhiteSpace(fileName))
        {
            throw new FileIncorrectPathException("File should have valid path");
        }

        return await ReadAndGetFileAsync(Path.Combine("others", fileName), "application/octet-stream");
    }

    [HttpGet("documents/{fileName}")]
    public async Task<FileContentResult> GetPdf(string fileName)
    {
        if (string.IsNullOrWhiteSpace(fileName))
        {
            throw new FileIncorrectPathException("File should have valid path");
        }

        return await ReadAndGetFileAsync(Path.Combine("documents", fileName), "application/pdf");
    }

    [HttpPost]
    [Authorize(AuthenticationSchemes = "College Api Key Scheme")]
    public async Task<string> UploadFileAsync(string? fileName, IFormFile file)
    {
        if (file is null || file.Length == 0)
        {
            throw new Exception("");
        }

        var name = string.IsNullOrEmpty(fileName) ? file.FileName : $"{fileName}{Path.GetExtension(file.FileName)}";

        var bytes = await GetFileBytesAsync(file);
        var path = await _mediator.Send(
            new UploadFileToHostCommand(name, bytes));

        return $"{_fileStorageSettings.BaseServerUrl}/{path}";
    }

    private async Task<byte[]> GetFileBytesAsync(IFormFile file)
    {
        using var memoryStream = new MemoryStream();

        await file.CopyToAsync(memoryStream);
        return memoryStream.ToArray();
    }

    private async Task<FileContentResult> ReadAndGetFileAsync(string filePath, string contentType)
    {
        var bytes = await _mediator.Send(new GetFileContentQuery(filePath));
        return File(bytes, contentType);
    }
}

