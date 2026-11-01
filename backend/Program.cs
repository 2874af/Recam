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