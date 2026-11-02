namespace Recam.Api.Options;

public sealed class PasswordResetOptions
{
    public const string SectionName = "PasswordReset";

    public string ResetUrl { get; init; }
        = string.Empty;

    public int TokenLifespanMinutes { get; init; }
        = 30;
}
