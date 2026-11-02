using System.Net;
using System.Net.Http.Json;
using Recam.Api.DTOs;
using Microsoft.Extensions.DependencyInjection;
using Recam.Api.Data;
using Recam.Api.DTOs.Auth;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Recam.Api.Entities;

namespace Recam.IntegrationTests;

public sealed class AuthorizationEndpointTests
    : IClassFixture<RecamWebApplicationFactory>,
      IAsyncLifetime
{
    private static readonly Guid DemoCompanyId = Guid.Parse(
        "11111111-1111-1111-1111-111111111111");

    private static readonly Guid DemoAgentId = Guid.Parse(
        "44444444-4444-4444-4444-444444444444");

    private readonly HttpClient _client;

    private readonly RecamWebApplicationFactory _factory;

    public AuthorizationEndpointTests(
        RecamWebApplicationFactory factory)
    {
        _factory = factory;
        _client = factory.CreateClient();
    }

    public async Task InitializeAsync()
    {
        await using var scope =
            _factory.Services.CreateAsyncScope();

        var dbContext =
            scope.ServiceProvider
                .GetRequiredService<AppDbContext>();

        var configuration =
            scope.ServiceProvider
                .GetRequiredService<IConfiguration>();

        var loggerFactory =
            scope.ServiceProvider
                .GetRequiredService<ILoggerFactory>();

        await DatabaseSeeder.SeedAsync(
            dbContext,
            configuration,
            loggerFactory.CreateLogger(
                nameof(AuthorizationEndpointTests)));
    }

    public Task DisposeAsync()
    {
        return Task.CompletedTask;
    }

    [Fact]
    public async Task CreateListingCase_WithoutToken_ReturnsUnauthorized()
    {
        var response = await _client.PostAsJsonAsync(
            "/api/listing-cases",
            CreateListingCaseRequest());

        Assert.Equal(
            HttpStatusCode.Unauthorized,
            response.StatusCode);
    }


    [Fact]
    public async Task CreateListingCase_AsAgent_ReturnsCreated()
    {
        var loginResponse =
            await _client.PostAsJsonAsync(
                "/api/auth/login",
                new LoginRequestDTO
                {
                    Email = "agent@recam.local",
                    Password = "TestAgent123!"
                });

        var auth =
            await loginResponse.Content
                .ReadFromJsonAsync<AuthResponseDTO>();

        Assert.NotNull(auth);

        _client.DefaultRequestHeaders.Authorization =
            new System.Net.Http.Headers
                .AuthenticationHeaderValue(
                    "Bearer",
                    auth.AccessToken);

        var response = await _client.PostAsJsonAsync(
            "/api/listing-cases",
            CreateListingCaseRequest());

        Assert.Equal(
            HttpStatusCode.Created,
            response.StatusCode);
    }

    [Fact]
    public async Task CreateListingCase_AsAdmin_ReturnsForbidden()
    {
        await AuthorizeAsync(
            "admin@recam.local",
            "TestAdmin123!");

        var response = await _client.PostAsJsonAsync(
            "/api/listing-cases",
            CreateListingCaseRequest());

        Assert.Equal(
            HttpStatusCode.Forbidden,
            response.StatusCode);
    }

    [Fact]
    public async Task CreateListingCase_AsStaff_ReturnsForbidden()
    {
        await AuthorizeAsync(
            "staff@recam.local",
            "TestStaff123!");

        var response = await _client.PostAsJsonAsync(
            "/api/listing-cases",
            CreateListingCaseRequest());

        Assert.Equal(
            HttpStatusCode.Forbidden,
            response.StatusCode);
    }

    [Fact]
    public async Task CreateListingCase_ForUnrelatedCompany_ReturnsForbidden()
    {
        var unrelatedCompanyId =
            await CreateCompanyAsync(addAgentRelationship: false);

        await AuthorizeAsync(
            "agent@recam.local",
            "TestAgent123!");

        var response = await _client.PostAsJsonAsync(
            "/api/listing-cases",
            CreateListingCaseRequest(unrelatedCompanyId));

        Assert.Equal(
            HttpStatusCode.Forbidden,
            response.StatusCode);
    }

    [Fact]
    public async Task GetListingCase_FromAnotherCompany_ReturnsNotFound()
    {
        var otherCompanyId =
            await CreateCompanyAsync(addAgentRelationship: true);

        await AuthorizeAsync(
            "agent@recam.local",
            "TestAgent123!");

        var createResponse = await _client.PostAsJsonAsync(
            "/api/listing-cases",
            CreateListingCaseRequest(otherCompanyId));

        Assert.Equal(
            HttpStatusCode.Created,
            createResponse.StatusCode);

        var created = await createResponse.Content
            .ReadFromJsonAsync<ListingCaseResponseDTO>();

        Assert.NotNull(created);

        await AuthorizeAsync(
            "admin@recam.local",
            "TestAdmin123!");

        var getResponse = await _client.GetAsync(
            $"/api/listing-cases/{created.Id}");

        Assert.Equal(
            HttpStatusCode.NotFound,
            getResponse.StatusCode);
    }

    private async Task AuthorizeAsync(
        string email,
        string password)
    {
        var loginResponse =
            await _client.PostAsJsonAsync(
                "/api/auth/login",
                new LoginRequestDTO
                {
                    Email = email,
                    Password = password
                });

        Assert.Equal(
            HttpStatusCode.OK,
            loginResponse.StatusCode);

        var auth =
            await loginResponse.Content
                .ReadFromJsonAsync<AuthResponseDTO>();

        Assert.NotNull(auth);

        _client.DefaultRequestHeaders.Authorization =
            new System.Net.Http.Headers
                .AuthenticationHeaderValue(
                    "Bearer",
                    auth.AccessToken);
    }

    private async Task<Guid> CreateCompanyAsync(
        bool addAgentRelationship)
    {
        await using var scope =
            _factory.Services.CreateAsyncScope();

        var dbContext = scope.ServiceProvider
            .GetRequiredService<AppDbContext>();

        var company = new PhotographyCompany
        {
            Id = Guid.NewGuid(),
            Name = $"Test Photography {Guid.NewGuid():N}"
        };

        dbContext.PhotographyCompanies.Add(company);

        if (addAgentRelationship)
        {
            var agent = await dbContext.Users.FindAsync(DemoAgentId);

            Assert.NotNull(agent);

            dbContext.CompanyAgents.Add(new CompanyAgent
            {
                Id = Guid.NewGuid(),
                PhotographyCompanyId = company.Id,
                PhotographyCompany = company,
                AgentUserId = agent.Id,
                AgentUser = agent
            });
        }

        await dbContext.SaveChangesAsync();

        return company.Id;
    }

    private static CreateListingCaseRequestDTO
        CreateListingCaseRequest(
            Guid? photographyCompanyId = null)
    {
        return new CreateListingCaseRequestDTO
        {
            PhotographyCompanyId =
                photographyCompanyId ?? DemoCompanyId,
            Address = "10 Integration Test Street",
            Bedrooms = 3,
            Bathrooms = 2,
            Garages = 1,
            Area = 180
        };
    }
}
