using College.Domain.Filters;
using College.Domain.Services;
using College.Domain.Settings;
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
    private readonly IFilePathFilter _filePathFilter;
    private readonly FileStorageSettings _fileStorageSettings;

    public UploadFileToHostCommandHandler(
        ILogger<UploadFileToHostCommandHandler> logger,
        IFileStorage fileStorage,
        IFilePathFilter filePathFilter,
        FileStorageSettings fileStorageSettings)
    {
        _fileStorageSettings = fileStorageSettings.ThrowIfNull();
        _filePathFilter = filePathFilter.ThrowIfNull();
        _fileStorage = fileStorage.ThrowIfNull();
        _logger = logger.ThrowIfNull();
    }

    public async Task<string> Handle(UploadFileToHostCommand request, CancellationToken cancellationToken)
    {

        var fileName = string.IsNullOrEmpty(request.FileName)
            ? $"{Guid.NewGuid():N}_{DateTime.UtcNow}"
            : request.FileName;

        // File path in server
        var filePath = Path.Combine(_fileStorageSettings.ServerFolderPath, _filePathFilter.GetFilteredFileName(fileName));
        // File path for API get request
        var fileClientPath = _filePathFilter.GetFilteredFileName(fileName);
        _logger.LogInformation("Destination file path = {FilePath}", filePath);

        await _fileStorage.SaveFileAsync(filePath, request.FileBytes);

        if (fileClientPath.Contains("others"))
        {
            fileClientPath = fileName;
        }


        return fileClientPath;
    }
}