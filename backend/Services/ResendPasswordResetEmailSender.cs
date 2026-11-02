using System.Net.Http.Headers;
using System.Net.Http.Json;
using System.Text.Encodings.Web;
using Microsoft.AspNetCore.WebUtilities;
using Microsoft.Extensions.Options;
using Recam.Api.Interfaces;
using Recam.Api.Options;

namespace Recam.Api.Services;

public sealed class ResendPasswordResetEmailSender
    : IPasswordResetEmailSender
{
    private readonly HttpClient _httpClient;
    private readonly EmailOptions _emailOptions;
    private readonly PasswordResetOptions _resetOptions;
    private readonly ILogger<
        ResendPasswordResetEmailSender> _logger;

    public ResendPasswordResetEmailSender(
        HttpClient httpClient,
        IOptions<EmailOptions> emailOptions,
        IOptions<PasswordResetOptions> resetOptions,
        ILogger<ResendPasswordResetEmailSender> logger)
    {
        _httpClient = httpClient;
        _emailOptions = emailOptions.Value;
        _resetOptions = resetOptions.Value;
        _logger = logger;
    }

    public async Task SendPasswordResetAsync(
        string email,
        string displayName,
        string resetToken,
        CancellationToken cancellationToken = default)
    {
        var resetUrl = QueryHelpers.AddQueryString(
            _resetOptions.ResetUrl,
            new Dictionary<string, string?>
            {
                ["email"] = email,
                ["token"] = resetToken
            });

        var safeName =
            HtmlEncoder.Default.Encode(displayName);

        var safeUrl =
            HtmlEncoder.Default.Encode(resetUrl);

        var html =
            $"""
            <p>Hello {safeName},</p>
            <p>Use the link below to reset your Recam password.</p>
            <p><a href="{safeUrl}">Reset password</a></p>
            <p>This link expires in {_resetOptions.TokenLifespanMinutes} minutes.</p>
            <p>If you did not request this, you can ignore this email.</p>
            """;

        using var request =
            new HttpRequestMessage(
                HttpMethod.Post,
                "emails");

        request.Headers.Authorization =
            new AuthenticationHeaderValue(
                "Bearer",
                _emailOptions.ApiKey);

        request.Content = JsonContent.Create(new
        {
            from =
                $"{_emailOptions.FromName} <{_emailOptions.FromAddress}>",
            to = new[] { email },
            subject = "Reset your Recam password",
            html
        });

        using var response =
            await _httpClient.SendAsync(
                request,
                cancellationToken);

        if (response.IsSuccessStatusCode)
        {
            return;
        }

        var responseBody =
            await response.Content.ReadAsStringAsync(
                cancellationToken);

        _logger.LogError(
            "Resend rejected password reset email with status {StatusCode}: {ResponseBody}",
            response.StatusCode,
            responseBody);

        throw new HttpRequestException(
            "Password reset email could not be sent.");
    }
}
