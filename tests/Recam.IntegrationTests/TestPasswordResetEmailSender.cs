using System.Collections.Concurrent;
using Recam.Api.Interfaces;

namespace Recam.IntegrationTests;

public sealed class TestPasswordResetEmailSender
    : IPasswordResetEmailSender
{
    private readonly ConcurrentDictionary<
        string,
        string> _tokens = new();

    public Task SendPasswordResetAsync(
        string email,
        string displayName,
        string resetToken,
        CancellationToken cancellationToken = default)
    {
        _tokens[email] = resetToken;

        return Task.CompletedTask;
    }

    public string? GetToken(string email)
    {
        return _tokens.TryGetValue(
            email,
            out var token)
            ? token
            : null;
    }
}
