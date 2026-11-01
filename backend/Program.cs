using Microsoft.EntityFrameworkCore;
using Recam.Api.Data;
using Recam.Api.Interfaces;
using Recam.Api.Services;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddControllers();

builder.Services.AddScoped<IListingCaseService, ListingCaseService>();

builder.Services.AddDbContext<AppDbContext>(options =>
{
    var connectionString =
        builder.Configuration.GetConnectionString("DefaultConnection")
        ?? throw new InvalidOperationException(
            "Database connection string is not configured.");

    options.UseNpgsql(connectionString);
});

var app = builder.Build();
app.MapControllers();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();

    await using var scope = app.Services.CreateAsyncScope();

    var dbContext =
        scope.ServiceProvider.GetRequiredService<AppDbContext>();

    var loggerFactory =
        scope.ServiceProvider.GetRequiredService<ILoggerFactory>();

    var logger = loggerFactory.CreateLogger("DatabaseStartup");

    try
    {
        logger.LogInformation(
            "Applying database migrations and development seed data.");

        await dbContext.Database.MigrateAsync();

        await DatabaseSeeder.SeedAsync(
            dbContext,
            builder.Configuration,
            logger);

        logger.LogInformation(
            "Database migrations and development seed data completed.");
    }
    catch (Exception exception)
    {
        logger.LogCritical(
            exception,
            "Database startup failed. Check the connection string and PostgreSQL availability.");

        throw;
    }
}


app.MapGet("/api/health", () =>
{
    return Results.Ok(new
    {
        status = "healthy",
        timestamp = DateTimeOffset.UtcNow
    });
})
.WithName("GetHealth");

app.Run();

public partial class Program
{
}