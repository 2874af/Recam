using Recam.Api.Entities;

namespace Recam.Api.Interfaces;

public interface IListingCaseRepository
{
    Task<bool> IsCompanyAgentAsync(
        Guid agentUserId, Guid companyId, CancellationToken cancellationToken);

    Task AddAsync(ListingCase listingCase, CancellationToken cancellationToken);

    Task<ListingCase?> FindForAgentAsync(
        Guid id, Guid agentUserId, CancellationToken cancellationToken);

    Task<ListingCase?> FindForCompanyAsync(
        Guid id, Guid companyId, CancellationToken cancellationToken);
}
