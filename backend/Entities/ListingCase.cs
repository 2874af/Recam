using Recam.Api.Enums;

namespace Recam.Api.Entities;

public class ListingCase
{
    public Guid Id { get; set; }

    public required string Address { get; set; }

    public ListingStatus Status { get; set; } = ListingStatus.Created;

    public int Bedrooms { get; set; }

    public int Bathrooms { get; set; }

    public int Garages { get; set; }

    public decimal? Area { get; set; }

    public DateTimeOffset CreatedAt { get; set; } = DateTimeOffset.UtcNow;

    public DateTimeOffset UpdatedAt { get; set; } = DateTimeOffset.UtcNow;
}