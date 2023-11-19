namespace College.Domain.Exceptions;

public class FileStorageException : Exception
{
    public FileStorageException(string message) : base(message) { }
}