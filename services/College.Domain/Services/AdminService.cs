using College.Domain.Configuration;
using College.Domain.Exceptions;
using College.Shared.Extensions;
using Microsoft.Extensions.Logging;

namespace College.Domain.Services;

public interface IAdminService
{
    Task<string> LoginAsync(CollegeAdmin admin);
}

public class AdminService : IAdminService
{
    private readonly ILogger<AdminService> _logger;
    private readonly CollegeAdmin _collegeAdminSecrets;
    private readonly CollegeApiKeyOptions _apiKeyOptions;

    public AdminService(ILogger<AdminService> logger, CollegeAdmin collegeAdminSecrets, CollegeApiKeyOptions apiKeyOptions)
    {
        _apiKeyOptions = apiKeyOptions.ThrowIfNull();
        _collegeAdminSecrets = collegeAdminSecrets.ThrowIfNull();
        _logger = logger.ThrowIfNull();
    }

    public async Task<string> LoginAsync(CollegeAdmin admin)
    {
        _logger.LogInformation("******* => Start login administrator {Login} {Password}", admin.Login, admin.Password);
        _logger.LogInformation("******* => Actual login administrator {Login} {Password}", _collegeAdminSecrets.Login, _collegeAdminSecrets.Password);
        await Task.CompletedTask;

        if (string.IsNullOrEmpty(admin.Login) || string.IsNullOrEmpty(admin.Password))
        {
            throw new NotAuthorizedException("Incorrect login or password");
        }

        if (!admin.Login.Equals(_collegeAdminSecrets.Login) || !admin.Password.Equals(_collegeAdminSecrets.Password))
        {
            throw new NotAuthorizedException("Incorrect login or password");
        }

        _logger.LogInformation("******* => Finish login administrator and Return API key");
        return _apiKeyOptions.ApiKey;
    }
}