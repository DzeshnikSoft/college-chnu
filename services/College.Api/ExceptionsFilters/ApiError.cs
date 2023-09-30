namespace College.API.ExceptionsFilters;

public class ApiError
{
    public string RequestId { get; set; }
    public string ReasonCode { get; set; }
    public string Message { get; set; }
}