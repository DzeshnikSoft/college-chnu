using Microsoft.AspNetCore.Authentication;

namespace College.API.Authentication;

public class ApiKeySchemeOptions : AuthenticationSchemeOptions
{
    public string ApiKey { get; set; }
}
