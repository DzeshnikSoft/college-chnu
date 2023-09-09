using College.Application.Queries.Pages;
using College.Data.Context;
using MediatR;
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
            cfg.UseSqlServer(configuration.GetConnectionString("collegeDb"));
        });

        // ****************************
        // MediatR
        // ****************************
        services.AddMediatR(cfg =>
            cfg.RegisterServicesFromAssemblyContaining<GetPagesByCategoriesQuery>());
    }
}
