using System.Net;
using System.Net.Http.Json;
using Recam.Api.DTOs.Auth;
using Recam.Api.Enums;

namespace Recam.IntegrationTests;

public sealed class AuthEndpointTests
    : IClassFixture<RecamWebApplicationFactory>
{
    private readonly HttpClient _client;

    public AuthEndpointTests(
        RecamWebApplicationFactory factory)
    {
        _client = factory.CreateClient();
    }

    [Fact]
    public async Task RegisterAgent_ReturnsCreatedAndTokens()
    {
        var request = CreateRegisterRequest();

        var response = await _client.PostAsJsonAsync(
            "/api/auth/register",
            request);

        Assert.Equal(
            HttpStatusCode.Created,
            response.StatusCode);

        var body =
            await response.Content
                .ReadFromJsonAsync<AuthResponseDTO>();

        Assert.NotNull(body);
        Assert.False(
            string.IsNullOrWhiteSpace(body.AccessToken));
        Assert.False(
            string.IsNullOrWhiteSpace(body.RefreshToken));

        Assert.Equal(
            UserRole.Agent,
            body.User.Role);

        Assert.Null(
            body.User.PhotographyCompanyId);
    }

    [Fact]
    public async Task Login_WithInvalidCredentials_ReturnsUnauthorized()
    {
        var request = new LoginRequestDTO
        {
            Email = "missing-agent@example.com",
            Password = "WrongPassword123!"
        };

        var response = await _client.PostAsJsonAsync(
            "/api/auth/login",
            request);

        Assert.Equal(
            HttpStatusCode.Unauthorized,
            response.StatusCode);
    }

    [Fact]
    public async Task RefreshToken_IsRotatedAndCanBeRevoked()
    {
        var registerResponse =
            await _client.PostAsJsonAsync(
                "/api/auth/register",
                CreateRegisterRequest());

        var registered =
            await registerResponse.Content
                .ReadFromJsonAsync<AuthResponseDTO>();

        Assert.NotNull(registered);

        var oldRefreshToken =
            registered.RefreshToken;

        var refreshResponse =
            await _client.PostAsJsonAsync(
                "/api/auth/refresh",
                new RefreshTokenRequestDTO
                {
                    RefreshToken = oldRefreshToken
                });

        Assert.Equal(
            HttpStatusCode.OK,
            refreshResponse.StatusCode);

        var refreshed =
            await refreshResponse.Content
                .ReadFromJsonAsync<AuthResponseDTO>();

        Assert.NotNull(refreshed);
        Assert.NotEqual(
            oldRefreshToken,
            refreshed.RefreshToken);

        var reuseOldTokenResponse =
            await _client.PostAsJsonAsync(
                "/api/auth/refresh",
                new RefreshTokenRequestDTO
                {
                    RefreshToken = oldRefreshToken
                });

        Assert.Equal(
            HttpStatusCode.Unauthorized,
            reuseOldTokenResponse.StatusCode);

        var logoutResponse =
            await _client.PostAsJsonAsync(
                "/api/auth/logout",
                new RefreshTokenRequestDTO
                {
                    RefreshToken =
                        refreshed.RefreshToken
                });

        Assert.Equal(
            HttpStatusCode.NoContent,
            logoutResponse.StatusCode);

        var refreshAfterLogoutResponse =
            await _client.PostAsJsonAsync(
                "/api/auth/refresh",
                new RefreshTokenRequestDTO
                {
                    RefreshToken =
                        refreshed.RefreshToken
                });

        Assert.Equal(
            HttpStatusCode.Unauthorized,
            refreshAfterLogoutResponse.StatusCode);
    }

    [Fact]
    public async Task GetCurrentUser_WithoutToken_ReturnsUnauthorized()
    {
        var response = await _client.GetAsync(
            "/api/auth/me");

        Assert.Equal(
            HttpStatusCode.Unauthorized,
            response.StatusCode);
    }

    [Fact]
    public async Task GetCurrentUser_WithToken_ReturnsCurrentUser()
    {
        var registerRequest = CreateRegisterRequest();

        var registerResponse =
            await _client.PostAsJsonAsync(
                "/api/auth/register",
                registerRequest);

        var registered =
            await registerResponse.Content
                .ReadFromJsonAsync<AuthResponseDTO>();

        Assert.NotNull(registered);

        _client.DefaultRequestHeaders.Authorization =
            new System.Net.Http.Headers
                .AuthenticationHeaderValue(
                    "Bearer",
                    registered.AccessToken);

        var response = await _client.GetAsync(
            "/api/auth/me");

        Assert.Equal(
            HttpStatusCode.OK,
            response.StatusCode);

        var currentUser =
            await response.Content
                .ReadFromJsonAsync<AuthUserResponseDTO>();

        Assert.NotNull(currentUser);
        Assert.Equal(
            registered.User.Id,
            currentUser.Id);
        Assert.Equal(
            registerRequest.Email,
            currentUser.Email);
        Assert.Equal(
            UserRole.Agent,
            currentUser.Role);
        Assert.Null(
            currentUser.PhotographyCompanyId);
    }

    private static RegisterRequestDTO
        CreateRegisterRequest()
    {
        return new RegisterRequestDTO
        {
            DisplayName = "Integration Test Agent",
            Email =
                $"agent-{Guid.NewGuid():N}@example.com",
            Password = "AgentTest123!"
        };
    }
}