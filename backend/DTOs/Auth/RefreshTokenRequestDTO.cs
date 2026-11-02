using System.ComponentModel.DataAnnotations;

namespace Recam.Api.DTOs.Auth;

public class RefreshTokenRequestDTO
{
    [Required]
    public required string RefreshToken { get; set; }
}
