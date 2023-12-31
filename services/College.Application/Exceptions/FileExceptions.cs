namespace College.Application.Exceptions;

public class FileNotFoundException(string filePath) : Exception($"File with path = {filePath} not found!")
{
}

public class FileIncorrectPathException(string message) : Exception(message)
{
}