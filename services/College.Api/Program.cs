using College.API.ExceptionsFilters;
using College.API.Extensions;
using College.Domain.Filters;
using Microsoft.Extensions.FileProviders;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers(config =>
{
    config.Filters.Add(typeof(ApiExceptionFilter));
});

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddMvc()
    .AddControllersAsServices();

builder.Services.AddCors(o => o.AddPolicy("CollegeApiPolicy", policyBuilder =>
{
    policyBuilder.AllowAnyOrigin()
        .AllowAnyMethod()
        .AllowAnyHeader();
}));

builder.Services.AddScoped<IFilePathFilter, FilePathFilter>();
// *************************
// Configure services
// *************************
builder.Services.ConfigureServices(builder.Configuration);

var app = builder.Build();

// Swagger always enabled
app.UseSwagger();
app.UseSwaggerUI();

app.UseHttpsRedirection();

app.UseAuthorization();
app.UseCors("CollegeApiPolicy");
app.MapControllers();

app.Run();