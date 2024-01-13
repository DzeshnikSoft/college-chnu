namespace College.Application.Exceptions;

public class UrlConflictException(string entity, string url)
    : Exception($"{entity} with url = {url} already exist.")
{
}
