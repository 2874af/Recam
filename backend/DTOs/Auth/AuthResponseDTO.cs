namespace Recam.Api.DTOs.Auth;

public class AuthResponseDTO
{
    public required string AccessToken { get; set; }

    public required string RefreshToken { get; set; }

    public DateTimeOffset AccessTokenExpiresAt { get; set; }

    public required AuthUserResponseDTO User { get; set; }
}
