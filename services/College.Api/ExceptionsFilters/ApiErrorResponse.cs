using System.Diagnostics.Contracts;
using System.Net;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Infrastructure;

namespace College.API.ExceptionsFilters;

public class ApiErrorResponse : ObjectResult, IStatusCodeActionResult
{
    private readonly string? _message;
    private readonly string _reasonCode;
    public string? RequestId { get; set; }

    public ApiErrorResponse(string reasonCode, int statusCode, string? message = null) : base(reasonCode)
    {
        StatusCode = statusCode;
        _reasonCode = reasonCode;
        _message = message;
    }

    public static ApiErrorResponse ValidationError(string propertyName, string message)
    {
        if (propertyName == null) throw new ArgumentNullException(nameof(propertyName));

        var reasonCode = $"college_api_{propertyName.ToLower()}_request_validation_failure";
        return new ApiErrorResponse(reasonCode, (int)HttpStatusCode.BadRequest, message);
    }

    public override void ExecuteResult(ActionContext context)
    {
        Value = new
        {
            RequestId,
            ReasonCode = _reasonCode,
        };

        base.ExecuteResult(context);
    }

    public override Task ExecuteResultAsync(ActionContext context)
    {
        Value = new
        {
            RequestId,
            ReasonCode = _reasonCode,
            Message = _message,
        };

        return base.ExecuteResultAsync(context);
    }
}