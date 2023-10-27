﻿using College.API.Mappers;
using College.Application.Queries.Pages;
using College.Data.Context;
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
        // MediatR
        // ****************************
        services.AddMediatR(cfg =>
            cfg.RegisterServicesFromAssemblyContaining<GetPagesQuery>());

        // ****************************
        // Automapper
        // ****************************
        services.AddAutoMapper(typeof(NewsMapperProfile));
    }
}
