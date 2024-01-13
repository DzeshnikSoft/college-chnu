using Microsoft.AspNetCore.Authentication;
using Microsoft.Extensions.Options;
using System.Security.Claims;
using System.Text.Encodings.Web;

namespace College.API.Authentication;

public class ApiKeyAuthenticationHandler(
    IOptionsMonitor<ApiKeySchemeOptions> options,
    ILoggerFactory logger, UrlEncoder encoder)
    : AuthenticationHandler<ApiKeySchemeOptions>(options, logger, encoder)
{
    private const string CollegeApiUser = "CollegeApiUser";
    private const string CollegeAuthHeader = "college-authorization";

    /// <summary>
    /// Handle Authenticate Requests.
    /// Authentication is successfull if the Request has an Authorization header with a value that matches The ApiKeyValue stored in Options.
    /// </summary>
    /// <returns></returns>
    protected override Task<AuthenticateResult> HandleAuthenticateAsync()
    {
        if (Request.Headers.TryGetValue(CollegeAuthHeader, out var authKey))
        {
            if (authKey == Options.ApiKey)
            {
                return Task.FromResult(AuthenticateResult.Success(CreateApiUserAuthenticationTicket()));
            }

            return Task.FromResult(AuthenticateResult.Fail("Incorrect Authentication Key"));
        }

        return Task.FromResult(AuthenticateResult.Fail("No Authentication Key Provided"));

    }

    private AuthenticationTicket CreateApiUserAuthenticationTicket()
    {
        var claims = new[] { new Claim(ClaimTypes.Name, CollegeApiUser) };
        var identity = new ClaimsIdentity(claims, Scheme.Name);
        var principal = new ClaimsPrincipal(identity);
        return new AuthenticationTicket(principal, ApiKeyAuthenticationExtensions.AuthenticationSchemeName);
    }
}
