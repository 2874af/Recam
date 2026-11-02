using System.ComponentModel.DataAnnotations;

namespace Recam.Api.DTOs.Auth;

public sealed class ForgotPasswordRequestDTO
{
    [Required]
    [EmailAddress]
    public string Email { get; init; } = string.Empty;
}
