using College.API.Authentication;
using College.API.ExceptionsFilters;
using College.API.Extensions;
using College.Data.Context;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers(config =>
{
    config.Filters.Add(typeof(ApiExceptionFilter));
});

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerConfiguration();
builder.Services.AddMvc()
    .AddControllersAsServices();

builder.Services.AddCors(o => o.AddPolicy("CollegeApiPolicy", policyBuilder =>
{
    policyBuilder.AllowAnyOrigin()
        .AllowAnyMethod()
        .AllowAnyHeader();
}));

// *************************
// Configure services
// *************************
builder.Services.ConfigureServices(builder.Configuration);

// *************************
// Authentication
// *************************
builder.Services.AddApiKeyAuthorization(builder.Configuration);

var app = builder.Build();

app.UseAuthentication();
app.UseAuthorization();

// Swagger always enabled
app.UseSwagger();
app.UseSwaggerUI();

app.UseHttpsRedirection();

app.UseCors("CollegeApiPolicy");
app.MapControllers();

using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;

    var context = services.GetRequiredService<CollegeDbContext>();
    context.Database.Migrate();
}

app.Run();