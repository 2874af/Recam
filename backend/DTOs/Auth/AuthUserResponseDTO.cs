using Recam.Api.Enums;

namespace Recam.Api.DTOs.Auth;

public class AuthUserResponseDTO
{
    public Guid Id { get; set; }

    public required string DisplayName { get; set; }

    public required string Email { get; set; }

    public UserRole Role { get; set; }

    public Guid? PhotographyCompanyId { get; set; }
}
