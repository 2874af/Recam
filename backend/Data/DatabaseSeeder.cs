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

    private static readonly Guid DemoStaffId =
        Guid.Parse("33333333-3333-3333-3333-333333333333");

    private static readonly Guid DemoAgentId =
        Guid.Parse("44444444-4444-4444-4444-444444444444");

    private static readonly Guid DemoCompanyAgentId =
        Guid.Parse("55555555-5555-5555-5555-555555555555");

    public static async Task SeedAsync(
        AppDbContext dbContext,
        IConfiguration configuration,
        ILogger logger)
    {
        var company =
            await dbContext.PhotographyCompanies
                .IgnoreQueryFilters()
                .FirstOrDefaultAsync(
                    company => company.Id == DemoCompanyId);

        if (company is null)
        {
            company = new PhotographyCompany
            {
                Id = DemoCompanyId,
                Name = "Recam Demo Photography"
            };

            dbContext.PhotographyCompanies.Add(company);
        }
        else
        {
            company.DeletedAt = null;
        }

        var admin = await EnsureUserAsync(
            dbContext,
            configuration,
            DemoAdminId,
            "admin@recam.local",
            "Recam Demo Admin",
            UserRole.Admin,
            company,
            "Seed:AdminPassword");

        var staff = await EnsureUserAsync(
            dbContext,
            configuration,
            DemoStaffId,
            "staff@recam.local",
            "Recam Demo Staff",
            UserRole.Staff,
            company,
            "Seed:StaffPassword");

        var agent = await EnsureUserAsync(
            dbContext,
            configuration,
            DemoAgentId,
            "agent@recam.local",
            "Recam Demo Agent",
            UserRole.Agent,
            null,
            "Seed:AgentPassword");

        await dbContext.SaveChangesAsync();

        var companyAgent =
            await dbContext.CompanyAgents
                .IgnoreQueryFilters()
                .FirstOrDefaultAsync(
                    relationship =>
                        relationship.PhotographyCompanyId ==
                            company.Id &&
                        relationship.AgentUserId ==
                            agent.Id);

        if (companyAgent is null)
        {
            companyAgent = new CompanyAgent
            {
                Id = DemoCompanyAgentId,
                PhotographyCompanyId = company.Id,
                PhotographyCompany = company,
                AgentUserId = agent.Id,
                AgentUser = agent
            };

            dbContext.CompanyAgents.Add(companyAgent);
        }
        else
        {
            companyAgent.DeletedAt = null;
        }

        await dbContext.SaveChangesAsync();

        logger.LogInformation(
            "Development seed data is ready for Admin {AdminEmail}, Staff {StaffEmail}, and Agent {AgentEmail}.",
            admin.Email,
            staff.Email,
            agent.Email);
    }

    private static async Task<AppUser> EnsureUserAsync(
        AppDbContext dbContext,
        IConfiguration configuration,
        Guid id,
        string email,
        string displayName,
        UserRole role,
        PhotographyCompany? company,
        string passwordConfigurationKey)
    {
        var normalizedEmail =
            email.ToUpperInvariant();

        var existingUser =
            await dbContext.Users
                .IgnoreQueryFilters()
                .FirstOrDefaultAsync(
                    user =>
                        user.NormalizedEmail ==
                            normalizedEmail);

        if (existingUser is not null)
        {
            return existingUser;
        }

        var password =
            configuration[passwordConfigurationKey]
            ?? throw new InvalidOperationException(
                $"{passwordConfigurationKey} is not configured.");

        var user = new AppUser
        {
            Id = id,
            UserName = email,
            NormalizedUserName = normalizedEmail,
            Email = email,
            NormalizedEmail = normalizedEmail,
            EmailConfirmed = true,
            DisplayName = displayName,
            Role = role,
            PhotographyCompanyId = company?.Id,
            PhotographyCompany = company,
            SecurityStamp = Guid.NewGuid().ToString(),
            ConcurrencyStamp = Guid.NewGuid().ToString()
        };

        var passwordHasher =
            new PasswordHasher<AppUser>();

        user.PasswordHash =
            passwordHasher.HashPassword(
                user,
                password);

        dbContext.Users.Add(user);

        return user;
    }
}
