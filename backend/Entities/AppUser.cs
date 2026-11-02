using Microsoft.AspNetCore.Identity;
using Recam.Api.Enums;

namespace Recam.Api.Entities;

public class AppUser : IdentityUser<Guid>
{
    public required string DisplayName { get; set; }

    public DateTimeOffset CreatedAt { get; set; } = DateTimeOffset.UtcNow;

    public DateTimeOffset UpdatedAt { get; set; } = DateTimeOffset.UtcNow;

    public DateTimeOffset? DeletedAt { get; set; }
    public required UserRole Role { get; set; }

    public Guid? PhotographyCompanyId { get; set; }

    public PhotographyCompany? PhotographyCompany { get; set; }
    public ICollection<CompanyAgent> AgentCompanies { get; set; }
    = new List<CompanyAgent>();

    public ICollection<RefreshToken> RefreshTokens { get; set; }
    = new List<RefreshToken>();
}
