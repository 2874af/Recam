using System.ComponentModel.DataAnnotations;

namespace Recam.Api.DTOs.Auth;

public sealed class ChangePasswordRequestDTO
{
    [Required]
    public string CurrentPassword { get; init; }
        = string.Empty;

    [Required]
    [MinLength(8)]
    public string NewPassword { get; init; }
        = string.Empty;
}
