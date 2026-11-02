using System.ComponentModel.DataAnnotations;

namespace Recam.Api.DTOs.Auth;

public class RegisterRequestDTO
{
    [Required]
    [MaxLength(100)]
    public required string DisplayName { get; set; }

    [Required]
    [EmailAddress]
    public required string Email { get; set; }

    [Required]
    [MinLength(8)]
    public required string Password { get; set; }
}
