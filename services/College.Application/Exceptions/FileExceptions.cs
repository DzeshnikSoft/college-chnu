namespace College.Application.Exceptions;

public class FileNotFoundException : Exception
{
    public FileNotFoundException(string filePath) :
        base($"File with path = {filePath} not found!")
    {
    }
}

public class FileIncorrectPathException : Exception
{
    public FileIncorrectPathException(string message) : base(message)
    {
    }
}