namespace College.Domain.Exceptions;

public class EntityNotFoundException : Exception
{
    public object Key { get; set; }

    public string Entity { get; set; }

    public EntityNotFoundException(string entity, object key)
        : base($"Entity {entity} not found by key = {key}")
    {
        Key = key;
        Entity = entity;
    }
}
