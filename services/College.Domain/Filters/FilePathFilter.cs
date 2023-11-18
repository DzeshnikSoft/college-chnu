using College.Shared.Exceptions;

namespace College.Domain.Filters;

public interface IFilePathFilter
{
    string GetFilteredFileName(string fileName);
}

public class FilePathFilter : IFilePathFilter
{
    public string GetFilteredFileName(string fileName)
    {
        if (fileName.CheckIfImageFilePath())
        {
            return Path.Combine($"images/{fileName}");
        }
        if (fileName.Contains(".pdf"))
        {
            return Path.Combine($"documents/{fileName}");
        }

        return Path.Combine("others", fileName);
    }
}