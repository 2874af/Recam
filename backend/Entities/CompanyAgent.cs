using System;

namespace Recam.Api.Entities;

public class CompanyAgent
{
    public Guid Id { get; set; }

    public Guid PhotographyCompanyId { get; set; }

    public required PhotographyCompany PhotographyCompany { get; set; }

    public Guid AgentUserId { get; set; }

    public required AppUser AgentUser { get; set; }

    public DateTimeOffset CreatedAt { get; set; } = DateTimeOffset.UtcNow;

    public DateTimeOffset UpdatedAt { get; set; } = DateTimeOffset.UtcNow;

    public DateTimeOffset? DeletedAt { get; set; }
}
