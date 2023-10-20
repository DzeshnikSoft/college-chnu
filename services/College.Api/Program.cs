using College.API.ExceptionsFilters;
using College.API.Extensions;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers(config =>
{
    config.Filters.Add<ApiExceptionFilter>();
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

// *************************
// Configure services
// *************************
builder.Services.ConfigureServices(builder.Configuration);

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// *************************
// Configure Middleware
// *************************
// app.UseMiddleware<ApiExceptionFilter>();

app.UseHttpsRedirection();

app.UseAuthorization();
app.UseCors("CollegeApiPolicy");
app.MapControllers();

app.Run();