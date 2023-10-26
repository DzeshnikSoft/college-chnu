namespace College.Domain.Exceptions;

public class EntityNotFoundException : Exception
{
    public EntityNotFoundException(string entity, object key)
        : base($"Entity {entity} not found by key = {key}")
    {
    }
}
