namespace Recam.Api.Options;

public sealed class EmailOptions
{
    public const string SectionName = "Email";

    public string ApiUrl { get; init; }
        = "https://api.resend.com";

    public string ApiKey { get; init; }
        = string.Empty;

    public string FromName { get; init; }
        = "Recam";

    public string FromAddress { get; init; }
        = string.Empty;

    public string Provider { get; init; }
        = "Development";
}
