namespace College.Shared.Exceptions;

public static class StringExtensions
{
    public static bool CheckIfImageFilePath(this string filePath)
    {
        var extension = Path.GetExtension(filePath);

        if (string.IsNullOrEmpty(extension))
        {
            return false;
        }


        string[] imageExtensions = [".jpg", ".jpeg", ".png", ".gif", ".bmp"];
        var lowerCaseExtension = extension.ToLower();

        return imageExtensions.Contains(lowerCaseExtension);
    }
}