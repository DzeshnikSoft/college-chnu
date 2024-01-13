using College.API.Mappers;
using College.API.Swagger;
using College.Application.Queries.Pages;
using College.Data.Context;
using College.Domain.Configuration;
using College.Domain.Filters;
using College.Domain.Services;
using College.Domain.Settings;
using Microsoft.EntityFrameworkCore;

namespace College.API.Extensions;

public static class ServiceCollectionExtension
{
    public static void ConfigureServices(this IServiceCollection services, IConfiguration configuration)
    {
        // ****************************
        // Datastore
        // ****************************
        services.AddDbContext<CollegeDbContext>(cfg =>
        {
            cfg.UseSqlServer(configuration.GetConnectionString("CollegeDb"));
        });

        // ****************************
        // Configuration Models
        // ****************************
        var collegeAdminOptions = new CollegeAdmin();
        configuration.GetSection("CollegeAdmin").Bind(collegeAdminOptions);
        services.AddSingleton(collegeAdminOptions);

        var collegeApiKeyOptions = new CollegeApiKeyOptions();
        configuration.GetSection("CollegeApiKeyOptions").Bind(collegeApiKeyOptions);
        services.AddSingleton(collegeApiKeyOptions);

        var fileStorageSettings = new FileStorageSettings();
        configuration.GetSection("FileStorageSettings").Bind(fileStorageSettings);
        services.AddSingleton(fileStorageSettings);

        // ****************************
        // MediatR
        // ****************************
        services.AddMediatR(cfg =>
            cfg.RegisterServicesFromAssemblyContaining<GetPagesQuery>());

        // ****************************
        // Automapper
        // ****************************
        services.AddAutoMapper(typeof(NewsMapperProfile));

        // ****************************
        // Services
        // ****************************
        services.AddScoped<IAdminService, AdminService>();
        services.AddScoped<IFileStorage, FileStorage>();
        services.AddScoped<IFilePathFilter, FilePathFilter>();
        services.AddScoped<ITemplateFactory, TemplateFactory>();
    }

    public static IServiceCollection AddSwaggerConfiguration(this IServiceCollection services)
    {
        services.AddSwaggerGen(sa =>
        {
            sa.OperationFilter<ApiKeyOperationFilter>();
        });

        return services;
    }
}
