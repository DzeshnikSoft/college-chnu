using System.Net;
using System.Text.Json;
using College.API.Exceptions;
using College.Domain.Exceptions;
using College.Shared.Extensions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace College.API.ExceptionsFilters;

public class ApiExceptionFilter : IExceptionFilter
{
    private readonly ILogger<ApiExceptionFilter> _logger;

    public ApiExceptionFilter(ILogger<ApiExceptionFilter> logger)
    {
        _logger = logger.ThrowIfNull();
    }

    public void OnException(ExceptionContext context)
    {
        if (context.Exception is ApiException gatewayEx)
        {
            var gatewayError = new ApiError
            {
                ReasonCode = gatewayEx.ReasonCode,
                RequestId = context.HttpContext.TraceIdentifier,
                Message = gatewayEx.Message
            };

            IActionResult? result = null;
            switch (gatewayEx.StatusCode)
            {
                case HttpStatusCode.BadRequest:
                    _logger.LogError(gatewayEx, "ApiException BadRequest Thrown: ReasonCode: {ReasonCode}",
                        gatewayEx.ReasonCode);
                    result = new BadRequestObjectResult(gatewayError);
                    break;
                case HttpStatusCode.Unauthorized:
                    _logger.LogError(gatewayEx, "ApiException Unauthorized Thrown: ReasonCode: {ReasonCode}",
                        gatewayEx.ReasonCode);
                    result = new UnauthorizedObjectResult(gatewayError);
                    break;
                case HttpStatusCode.NotFound:
                    _logger.LogError(gatewayEx, "ApiException NotFound Thrown: ReasonCode: {ReasonCode}",
                        gatewayEx.ReasonCode);
                    result = new NotFoundObjectResult(gatewayError);
                    break;
                case HttpStatusCode.InternalServerError:
                    _logger.LogError(gatewayEx, "ApiException InternalServerError Thrown: ReasonCode: {ReasonCode}",
                        gatewayEx.ReasonCode);
                    result = new ObjectResult(gatewayError)
                    {
                        StatusCode = 500,
                    };
                    break;
            }

            if (result != null)
            {
                context.Result = result;
            }
        }
    }
}