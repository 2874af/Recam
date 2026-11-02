using Microsoft.EntityFrameworkCore;
using Recam.Api.Data;
using Recam.Api.Interfaces;
using Recam.Api.Services;
using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Recam.Api.Entities;
using Recam.Api.Options;
using Recam.Api.Authorization;
using Recam.Api.Enums;
using Microsoft.OpenApi;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options =>
{
    options.AddSecurityDefinition(
        "Bearer",
        new OpenApiSecurityScheme
        {
            Type = SecuritySchemeType.Http,
            Scheme = "bearer",
            BearerFormat = "JWT",
            Description = "Enter the JWT access token."
        });

    options.AddSecurityRequirement(document =>
        new OpenApiSecurityRequirement
        {
            [new OpenApiSecuritySchemeReference("Bearer", document)] = []
        });
});

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

builder.Services
    .AddIdentityCore<AppUser>(options =>
    {
        options.User.RequireUniqueEmail = true;

        options.Password.RequiredLength = 8;
        options.Password.RequireUppercase = true;
        options.Password.RequireLowercase = true;
        options.Password.RequireDigit = true;
        options.Password.RequireNonAlphanumeric = true;
    })
    .AddSignInManager()
    .AddEntityFrameworkStores<AppDbContext>();

var jwtSection =
    builder.Configuration.GetSection(JwtOptions.SectionName);

builder.Services
    .AddOptions<JwtOptions>()
    .Bind(jwtSection)
    .Validate(options =>
        !string.IsNullOrWhiteSpace(options.Issuer),
        "Jwt:Issuer is required.")
    .Validate(options =>
        !string.IsNullOrWhiteSpace(options.Audience),
        "Jwt:Audience is required.")
    .Validate(options =>
        !string.IsNullOrWhiteSpace(options.Key),
        "Jwt:Key is required.")
    .Validate(options =>
        options.AccessTokenMinutes > 0,
        "Jwt:AccessTokenMinutes must be greater than zero.")
    .Validate(options =>
        options.RefreshTokenDays > 0,
        "Jwt:RefreshTokenDays must be greater than zero.")
    .ValidateOnStart();

builder.Services
    .AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer();

builder.Services
    .AddOptions<JwtBearerOptions>(
        JwtBearerDefaults.AuthenticationScheme)
    .Configure<IOptions<JwtOptions>>((
        options,
        jwtOptionsAccessor) =>
    {
        var jwtOptions = jwtOptionsAccessor.Value;

        options.TokenValidationParameters =
            new TokenValidationParameters
            {
                ValidateIssuer = true,
                ValidIssuer = jwtOptions.Issuer,

                ValidateAudience = true,
                ValidAudience = jwtOptions.Audience,

                ValidateIssuerSigningKey = true,
                IssuerSigningKey =
                    new SymmetricSecurityKey(
                        Encoding.UTF8.GetBytes(jwtOptions.Key)),

                ValidateLifetime = true,
                ClockSkew = TimeSpan.Zero
            };
    });

builder.Services.AddScoped<ITokenService, TokenService>();

builder.Services.AddAuthorization(options =>
    {
        options.AddPolicy(
            AuthorizationPolicies.AdminOnly,
            policy =>
            {
                policy.RequireRole(
                    UserRole.Admin.ToString());

                policy.RequireClaim(
                    RecamClaimTypes.CompanyId);
            });

        options.AddPolicy(
            AuthorizationPolicies.StaffOnly,
            policy =>
            {
                policy.RequireRole(
                    UserRole.Staff.ToString());

                policy.RequireClaim(
                    RecamClaimTypes.CompanyId);
            });

        options.AddPolicy(
            AuthorizationPolicies.AgentOnly,
            policy =>
            {
                policy.RequireRole(
                    UserRole.Agent.ToString());
            });

        options.AddPolicy(
            AuthorizationPolicies.CompanyMember,
            policy =>
            {
                policy.RequireRole(
                    UserRole.Admin.ToString(),
                    UserRole.Staff.ToString());

                policy.RequireClaim(
                    RecamClaimTypes.CompanyId);
            });
    });

builder.Services.AddScoped<IAuthService, AuthService>();

var app = builder.Build();

app.UseAuthentication();
app.UseAuthorization();

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
