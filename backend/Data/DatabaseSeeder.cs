using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Recam.Api.Entities;
using Recam.Api.Enums;

namespace Recam.Api.Data;

public static class DatabaseSeeder
{
    private static readonly Guid DemoCompanyId =
        Guid.Parse("11111111-1111-1111-1111-111111111111");

    private static readonly Guid DemoAdminId =
        Guid.Parse("22222222-2222-2222-2222-222222222222");

    public static async Task SeedAsync(
        AppDbContext dbContext,
        IConfiguration configuration,
        ILogger logger)
    {
        const string adminEmail = "admin@recam.local";

        var adminAlreadyExists = await dbContext.Users
            .AnyAsync(user => user.NormalizedEmail == adminEmail.ToUpperInvariant());

        if (adminAlreadyExists)
        {
            logger.LogInformation("Development seed data already exists.");
            return;
        }

        var company = await dbContext.PhotographyCompanies
            .FirstOrDefaultAsync(company => company.Id == DemoCompanyId);

        if (company is null)
        {
            company = new PhotographyCompany
            {
                Id = DemoCompanyId,
                Name = "Recam Demo Photography"
            };

            dbContext.PhotographyCompanies.Add(company);
        }

        var adminPassword =
            configuration["Seed:AdminPassword"]
            ?? throw new InvalidOperationException(
                "Seed:AdminPassword is not configured.");

        var admin = new AppUser
        {
            Id = DemoAdminId,
            UserName = adminEmail,
            NormalizedUserName = adminEmail.ToUpperInvariant(),
            Email = adminEmail,
            NormalizedEmail = adminEmail.ToUpperInvariant(),
            EmailConfirmed = true,
            DisplayName = "Recam Demo Admin",
            Role = UserRole.Admin,
            PhotographyCompanyId = company.Id,
            PhotographyCompany = company,
            SecurityStamp = Guid.NewGuid().ToString(),
            ConcurrencyStamp = Guid.NewGuid().ToString()
        };

        var passwordHasher = new PasswordHasher<AppUser>();

        admin.PasswordHash = passwordHasher.HashPassword(
            admin,
            adminPassword);

        dbContext.Users.Add(admin);
        await dbContext.SaveChangesAsync();

        logger.LogInformation(
            "Created development company and Admin account {AdminEmail}.",
            adminEmail);
    }
}
