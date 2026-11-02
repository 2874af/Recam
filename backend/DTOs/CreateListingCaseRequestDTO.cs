using System.ComponentModel.DataAnnotations;

namespace Recam.Api.DTOs;

public sealed class CreateListingCaseRequestDTO
{
    public Guid PhotographyCompanyId { get; init; }

    [Required]
    [StringLength(300, MinimumLength = 5)]
    public string Address { get; init; } = string.Empty;

    [Range(0, 50)]
    public int Bedrooms { get; init; }

    [Range(0, 50)]
    public int Bathrooms { get; init; }

    [Range(0, 50)]
    public int Garages { get; init; }

    [Range(0, 1_000_000)]
    public decimal? Area { get; init; }
}
