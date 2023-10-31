using College.API.Mappers;
using College.Application.Queries.Pages;
using College.Data.Context;
using College.Domain.Configuration;
using College.Domain.Services;
using Microsoft.EntityFrameworkCore;

namespace College.API.Extensions;

public static class ServiceCollectionExtension
{
    public static void ConfigureServices(this IServiceCollection services, IConfiguration configuration)
    {
        // ****************************
        // datastore
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
    }
}
