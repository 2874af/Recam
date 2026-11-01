using System;

namespace Recam.Api.Entities;

public class PhotographyCompany
{
    public Guid Id { get; set; }

    public required string Name { get; set; }

    public DateTimeOffset CreatedAt { get; set; } = DateTimeOffset.UtcNow;

    public DateTimeOffset UpdatedAt { get; set; } = DateTimeOffset.UtcNow;

    public DateTimeOffset? DeletedAt { get; set; }
    
    public ICollection<AppUser> Members { get; set; }
    = new List<AppUser>();

    public ICollection<CompanyAgent> Agents { get; set; }
    = new List<CompanyAgent>();
}
