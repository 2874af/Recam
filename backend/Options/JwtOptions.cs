using System;

namespace Recam.Api.Options;

public class JwtOptions
{
    public const string SectionName = "Jwt";

    public required string Issuer { get; set; }

    public required string Audience { get; set; }

    public required string Key { get; set; }

    public int AccessTokenMinutes { get; set; }

    public int RefreshTokenDays { get; set; }
}
