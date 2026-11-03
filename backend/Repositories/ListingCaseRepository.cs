using Microsoft.EntityFrameworkCore;
using Recam.Api.Data;
using Recam.Api.Entities;
using Recam.Api.Interfaces;

namespace Recam.Api.Repositories;

public sealed class ListingCaseRepository : IListingCaseRepository
{
    private readonly AppDbContext _dbContext;

    public ListingCaseRepository(AppDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public Task<bool> IsCompanyAgentAsync(
        Guid agentUserId, Guid companyId, CancellationToken cancellationToken)
    {
        return _dbContext.CompanyAgents.AnyAsync(
            relationship => relationship.AgentUserId == agentUserId &&
                relationship.PhotographyCompanyId == companyId,
            cancellationToken);
    }

    public async Task AddAsync(
        ListingCase listingCase, CancellationToken cancellationToken)
    {
        _dbContext.ListingCases.Add(listingCase);
        await _dbContext.SaveChangesAsync(cancellationToken);
    }

    public Task<ListingCase?> FindForAgentAsync(
        Guid id, Guid agentUserId, CancellationToken cancellationToken)
    {
        return _dbContext.ListingCases.AsNoTracking().FirstOrDefaultAsync(
            item => item.Id == id && item.AgentUserId == agentUserId,
            cancellationToken);
    }

    public Task<ListingCase?> FindForCompanyAsync(
        Guid id, Guid companyId, CancellationToken cancellationToken)
    {
        return _dbContext.ListingCases.AsNoTracking().FirstOrDefaultAsync(
            item => item.Id == id && item.PhotographyCompanyId == companyId,
            cancellationToken);
    }
}
