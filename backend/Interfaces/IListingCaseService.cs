using Recam.Api.DTOs;

namespace Recam.Api.Interfaces;

public interface IListingCaseService
{
    Task<ListingCaseResponseDTO?> CreateAsync(
        CreateListingCaseRequestDTO request,
        CancellationToken cancellationToken);

    Task<ListingCaseResponseDTO?> GetByIdAsync(
        Guid id,
        CancellationToken cancellationToken);
}
