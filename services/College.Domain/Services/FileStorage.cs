using College.Domain.Exceptions;
using College.Shared.Extensions;
using Microsoft.Extensions.Logging;

namespace College.Domain.Services;

public interface IFileStorage
{
    /// <summary>
    /// Saved FileInfo by FilePath
    /// </summary>
    /// <param name="filePath">File path</param>
    /// <param name="fileBytes">Bytes array</param>
    /// <returns>File Path</returns>
    Task<string> SaveFileAsync(string filePath, byte[] fileBytes);
}

public class FileStorage(ILogger<FileStorage> logger) : IFileStorage
{
    private readonly ILogger<FileStorage> _logger = logger.ThrowIfNull();

    public async Task<string> SaveFileAsync(string filePath, byte[] fileBytes)
    {
        if (string.IsNullOrEmpty(filePath) || fileBytes.Length == 0)
        {
            throw new FileStorageException("File validation exception");
        }

        try
        {
            var directory = Path.GetDirectoryName(filePath);
            if (!string.IsNullOrEmpty(directory) && !Directory.Exists(directory))
            {
                Directory.CreateDirectory(directory);
            }

            await using var fileStream = new FileStream(filePath, FileMode.Create);

            await fileStream.WriteAsync(fileBytes);

            var fileInfo = new FileInfo(filePath);
            _logger.LogInformation("Successfully created file with path {FilePath} with Length = {FileLenght}", fileInfo.FullName, fileInfo.Length);

            return fileInfo.FullName;
        }
        catch (Exception e)
        {
            _logger.LogError(e, "Something went wrong during saving file {FilePath}", filePath);
            throw;
        }
    }
}