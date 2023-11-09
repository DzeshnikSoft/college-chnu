using College.Domain.Services;
using College.Shared.Extensions;
using MediatR;
using Microsoft.Extensions.Logging;

namespace College.Application.Commands.Files;

public class UploadFileToHostCommand : IRequest<string>
{
    public UploadFileToHostCommand(string fileName, byte[] fileBytes)
    {
        FileName = fileName;
        FileBytes = fileBytes;
    }

    public string FileName { get; }

    public byte[] FileBytes { get; }
}

public class UploadFileToHostCommandHandler : IRequestHandler<UploadFileToHostCommand, string>
{
    private readonly ILogger<UploadFileToHostCommandHandler> _logger;
    private readonly IFileStorage _fileStorage;
    private const string DestinationFilesFolder = "uploads";

    public UploadFileToHostCommandHandler(ILogger<UploadFileToHostCommandHandler> logger, IFileStorage fileStorage)
    {
        _fileStorage = fileStorage.ThrowIfNull();
        _logger = logger.ThrowIfNull();
    }

    public async Task<string> Handle(UploadFileToHostCommand request, CancellationToken cancellationToken)
    {
        var filePath = string.IsNullOrEmpty(request.FileName)
            ? Path.Combine(DestinationFilesFolder, $"{Guid.NewGuid():N}_{DateTime.UtcNow}")
            : Path.Combine(DestinationFilesFolder, request.FileName);

        _logger.LogInformation("Destination file path = {FilePath}", filePath);

        return await _fileStorage.SaveFileAsync(filePath, request.FileBytes);
    }
}