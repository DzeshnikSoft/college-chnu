namespace College.API.Exceptions;

public class ValidationException : Exception
{
    public readonly string Request;
    public readonly string Field;

    public ValidationException(string request, string field)
    {
        Request = request;
        Field = field;
    }

    public ValidationException(string request, string field, string? message) : base(message)
    {
        Request = request;
        Field = field;
    }
}