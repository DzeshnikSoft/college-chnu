using Microsoft.AspNetCore.Authentication;

namespace College.API.Authentication;

public static class ApiKeyAuthenticationExtensions
{
    public const string AuthenticationSchemeName = "College Api Key Scheme";
    private const string AuthenticationSchemeDisplayName = "College Api Authentication Scheme";

    public static IServiceCollection AddApiKeyAuthorization(this IServiceCollection services, IConfiguration configuration)
    {
        var apiKeyValue = configuration.GetValue<string>("ApiKey") ?? throw new Exception("ApiKey not provided");
        services
            .AddAuthentication(options => options.AddApiKeyScheme())
            .AddApiKeyAuthentication(o => o.ApiKey = apiKeyValue);
        return services;
    }

    public static AuthenticationBuilder AddApiKeyAuthentication(this AuthenticationBuilder builder, Action<ApiKeySchemeOptions> options)
    {
        return builder.AddScheme<ApiKeySchemeOptions, ApiKeyAuthenticationHandler>(AuthenticationSchemeName, AuthenticationSchemeDisplayName, options);
    }

    public static void AddApiKeyScheme(this AuthenticationOptions authenticationOptions)
    {
        authenticationOptions.DefaultAuthenticateScheme = AuthenticationSchemeName;
        authenticationOptions.DefaultChallengeScheme = AuthenticationSchemeName;
        authenticationOptions.DefaultScheme = AuthenticationSchemeName;
    }
}
