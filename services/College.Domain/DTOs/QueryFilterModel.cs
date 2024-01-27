namespace College.Domain.DTOs;

public class QueryFilterModel
{
    /// <summary>
    /// PageSize of records what you want to receive.
    /// </summary>
    /// <remarks>If PageSize is 0, returns all records what we have.</remarks>
    public int PageSize { get; set; }

    public int PageNumber { get; set; }

    public string SearchTerm { get; set; }
}
