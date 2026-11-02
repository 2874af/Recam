using Recam.Api.Enums;

namespace Recam.Api.DTOs;

public sealed class ListingCaseResponseDTO
{
    public Guid Id { get; init; }

    public Guid PhotographyCompanyId { get; init; }

    public Guid AgentUserId { get; init; }

    public string Address { get; init; } = string.Empty;

    public ListingStatus Status { get; init; }

    public int Bedrooms { get; init; }

    public int Bathrooms { get; init; }

    public int Garages { get; init; }

    public decimal? Area { get; init; }

    public DateTimeOffset CreatedAt { get; init; }

    public DateTimeOffset UpdatedAt { get; init; }
}
