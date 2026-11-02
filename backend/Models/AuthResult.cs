using Recam.Api.DTOs.Auth;

namespace Recam.Api.Models;

public class AuthResult
{
    public bool Succeeded { get; init; }

    public AuthResponseDTO? Response { get; init; }

    public IReadOnlyCollection<string> Errors { get; init; }
        = Array.Empty<string>();

    public static AuthResult Success(
        AuthResponseDTO response)
    {
        return new AuthResult
        {
            Succeeded = true,
            Response = response
        };
    }

    public static AuthResult Failure(
        params string[] errors)
    {
        return new AuthResult
        {
            Succeeded = false,
            Errors = errors
        };
    }
}
