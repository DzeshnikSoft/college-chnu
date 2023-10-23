namespace College.Application.Exceptions;

public class CategoryAlreadyExistExceptions : Exception
{
    public CategoryAlreadyExistExceptions(string message) : base(message)
    {
    }
}