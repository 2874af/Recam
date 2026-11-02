using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Recam.Api.Data;
using Recam.Api.Enums;
using Microsoft.Extensions.Logging;

namespace Recam.IntegrationTests;

public sealed class DatabaseSeederTests
    : IClassFixture<RecamWebApplicationFactory>
{
    private readonly RecamWebApplicationFactory _factory;

    public DatabaseSeederTests(
        RecamWebApplicationFactory factory)
    {
        _factory = factory;
    }

    [Fact]
    public async Task SeedAsync_CalledTwice_DoesNotCreateDuplicates()
    {
        using var scope =
            _factory.Services.CreateScope();

        var dbContext =
            scope.ServiceProvider
                .GetRequiredService<AppDbContext>();

        var configuration =
            scope.ServiceProvider
                .GetRequiredService<IConfiguration>();

        var loggerFactory =
            scope.ServiceProvider
                .GetRequiredService<ILoggerFactory>();

        var logger =
            loggerFactory.CreateLogger(
                "DatabaseSeederTests");

        await DatabaseSeeder.SeedAsync(
            dbContext,
            configuration,
            logger);

        await DatabaseSeeder.SeedAsync(
            dbContext,
            configuration,
            logger);

        Assert.Equal(
            1,
            await dbContext.PhotographyCompanies.CountAsync());

        Assert.Equal(
            3,
            await dbContext.Users.CountAsync());

        Assert.Equal(
            1,
            await dbContext.CompanyAgents.CountAsync());

        var admin =
            await dbContext.Users.SingleAsync(
                user => user.Role == UserRole.Admin);

        var staff =
            await dbContext.Users.SingleAsync(
                user => user.Role == UserRole.Staff);

        var agent =
            await dbContext.Users.SingleAsync(
                user => user.Role == UserRole.Agent);

        Assert.NotNull(admin.PhotographyCompanyId);
        Assert.NotNull(staff.PhotographyCompanyId);
        Assert.Null(agent.PhotographyCompanyId);

        var relationship =
            await dbContext.CompanyAgents.SingleAsync();

        Assert.Equal(
            agent.Id,
            relationship.AgentUserId);

        Assert.Equal(
            admin.PhotographyCompanyId,
            relationship.PhotographyCompanyId);
    }
}