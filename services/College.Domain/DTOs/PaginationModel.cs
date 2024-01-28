namespace College.Domain.DTOs;

public class PaginationModel<T>
{
    public PaginationModel()
    {
    }

    public PaginationModel(IList<T> data, int pageNumber, int pageSize, int totalItems)
    {
        Data = data;
        PageNumber = pageNumber;
        PageSize = pageSize;
        TotalItems = totalItems;
    }

    public IList<T> Data { get; set; }

    public int PageNumber { get; set; }

    public int PageSize { get; set; }

    public int TotalItems { get; set; }

    public int TotalPages => (int)Math.Ceiling((double)TotalItems / PageSize);

    public bool HasNextPage => PageSize != 0 && PageNumber < TotalPages;
}
