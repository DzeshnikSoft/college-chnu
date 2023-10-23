using System.Net;

namespace College.Shared.Exceptions;

public class ApiException : Exception
{
    public ApiException(
        string message,
        string reasonCode,
        HttpStatusCode statusCode = HttpStatusCode.InternalServerError,
        Exception? innerException = null)
        : base(message, innerException)
    {
        ReasonCode = reasonCode;
        StatusCode = statusCode;
    }

    public string ReasonCode { get; set; }
    public HttpStatusCode StatusCode { get; set; }
}