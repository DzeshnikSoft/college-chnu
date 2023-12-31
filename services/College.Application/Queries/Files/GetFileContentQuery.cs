using College.Application.Exceptions;
using College.Domain.Settings;
using College.Shared.Extensions;
using MediatR;
using Microsoft.Extensions.Logging;
using FileNotFoundException = College.Application.Exceptions.FileNotFoundException;

namespace College.Application.Queries.Files;

public class GetFileContentQuery(string filePath) : IRequest<byte[]>
{
    public string FilePath { get; set; } = filePath;
}

public class GetFileContentQueryHandler(ILogger<GetFileContentQueryHandler> logger, FileStorageSettings fileStorageSettings) : IRequestHandler<GetFileContentQuery, byte[]>
{
    private readonly ILogger<GetFileContentQueryHandler> _logger = logger.ThrowIfNull();
    private readonly FileStorageSettings _fileStorageSettings = fileStorageSettings.ThrowIfNull();

    public async Task<byte[]> Handle(GetFileContentQuery request, CancellationToken cancellationToken)
    {
        if (string.IsNullOrWhiteSpace(request.FilePath))
        {
            _logger.LogError("FilePath should have valid path");
            throw new FileIncorrectPathException("FilePath should have valid path");
        }

        var path = Path.Combine(_fileStorageSettings.ServerFolderPath, request.FilePath);

        if (!File.Exists(path))
        {
            _logger.LogError("FilePath = {FilePath} not found on server", path);
            throw new FileNotFoundException(request.FilePath);
        }

        return await File.ReadAllBytesAsync(path, cancellationToken);
    }
}
