using System.Net;
using System.Net.Http.Json;
using Recam.Api.DTOs;
using Microsoft.Extensions.DependencyInjection;
using Recam.Api.Data;
using Recam.Api.DTOs.Auth;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;

namespace Recam.IntegrationTests;

public sealed class AuthorizationEndpointTests
    : IClassFixture<RecamWebApplicationFactory>,
      IAsyncLifetime
{
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
    public async Task CreateListingCase_AsAgent_ReturnsForbidden()
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
            HttpStatusCode.Forbidden,
            response.StatusCode);
    }

    [Fact]
    public async Task CreateListingCase_AsAdmin_ReturnsCreated()
    {
        await AuthorizeAsync(
            "admin@recam.local",
            "TestAdmin123!");

        var response = await _client.PostAsJsonAsync(
            "/api/listing-cases",
            CreateListingCaseRequest());

        Assert.Equal(
            HttpStatusCode.Created,
            response.StatusCode);
    }

    [Fact]
    public async Task CreateListingCase_AsStaff_ReturnsCreated()
    {
        await AuthorizeAsync(
            "staff@recam.local",
            "TestStaff123!");

        var response = await _client.PostAsJsonAsync(
            "/api/listing-cases",
            CreateListingCaseRequest());

        Assert.Equal(
            HttpStatusCode.Created,
            response.StatusCode);
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

    private static CreateListingCaseRequestDTO
        CreateListingCaseRequest()
    {
        return new CreateListingCaseRequestDTO
        {
            Address = "10 Integration Test Street",
            Bedrooms = 3,
            Bathrooms = 2,
            Garages = 1,
            Area = 180
        };
    }
}