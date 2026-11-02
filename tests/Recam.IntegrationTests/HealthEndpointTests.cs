using System.Net;

namespace Recam.IntegrationTests;

public sealed class HealthEndpointTests
    : IClassFixture<RecamWebApplicationFactory>
{
    private readonly HttpClient _client;

    public HealthEndpointTests(
        RecamWebApplicationFactory factory)
    {
        _client = factory.CreateClient();
    }

    [Fact]
    public async Task GetHealth_ReturnsOk()
    {
        var response = await _client.GetAsync("/api/health");

        Assert.Equal(HttpStatusCode.OK, response.StatusCode);
    }
}
