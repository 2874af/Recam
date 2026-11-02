using System.ComponentModel.DataAnnotations;

namespace Recam.Api.DTOs.Auth;

public class LoginRequestDTO
{
    [Required]
    [EmailAddress]
    public required string Email { get; set; }

    [Required]
    public required string Password { get; set; }
}
