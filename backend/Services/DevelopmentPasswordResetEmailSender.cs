using Microsoft.AspNetCore.WebUtilities;
using Microsoft.Extensions.Options;
using Recam.Api.Interfaces;
using Recam.Api.Options;

namespace Recam.Api.Services;

public sealed class DevelopmentPasswordResetEmailSender
    : IPasswordResetEmailSender
{
    private readonly PasswordResetOptions _options;
    private readonly IWebHostEnvironment _environment;
    private readonly ILogger<
        DevelopmentPasswordResetEmailSender> _logger;

    public DevelopmentPasswordResetEmailSender(
        IOptions<PasswordResetOptions> options,
        IWebHostEnvironment environment,
        ILogger<DevelopmentPasswordResetEmailSender> logger)
    {
        _options = options.Value;
        _environment = environment;
        _logger = logger;
    }

    public Task SendPasswordResetAsync(
        string email,
        string displayName,
        string resetToken,
        CancellationToken cancellationToken = default)
    {
        if (!_environment.IsDevelopment())
        {
            throw new InvalidOperationException(
                "The development email sender cannot be used outside Development.");
        }

        var resetUrl = QueryHelpers.AddQueryString(
            _options.ResetUrl,
            new Dictionary<string, string?>
            {
                ["email"] = email,
                ["token"] = resetToken
            });

        _logger.LogWarning(
            "Development password reset for {DisplayName} ({Email}): {ResetUrl}",
            displayName,
            email,
            resetUrl);

        return Task.CompletedTask;
    }
}
