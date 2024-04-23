namespace College.Domain.DTOs;

public class Paginator<T>
{
    public Paginator()
    {
    }

    public Paginator(IList<T> data, int pageNumber, int pageSize, int totalItems)
    {
        Data = data;
        PageNumber = pageNumber;
        PageSize = pageSize;
        TotalItems = totalItems;
    }

    /// <summary>
    /// Can be used when pagination not needed.
    /// </summary>
    public Paginator(IList<T> data)
    {
        Data = data;
        TotalItems = data.Count;
    }

    public IList<T> Data { get; set; }

    public int? PageNumber { get; set; }

    public int? PageSize { get; set; }

    public int? TotalItems { get; set; }

    public int? TotalPages => TotalItems.HasValue && PageSize.HasValue
        ? (int)Math.Ceiling((double)TotalItems.Value / PageSize.Value)
        : null;

    public bool HasNextPage => PageSize != 0 && PageNumber < TotalPages;
}
