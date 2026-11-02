using Microsoft.EntityFrameworkCore;
using Recam.Api.Data;
using Recam.Api.DTOs;
using Recam.Api.Entities;
using Recam.Api.Interfaces;

namespace Recam.Api.Services;

public sealed class ListingCaseService : IListingCaseService
{
    private readonly AppDbContext _dbContext;
    private readonly ICurrentUserContext _currentUser;

    public ListingCaseService(
        AppDbContext dbContext,
        ICurrentUserContext currentUser)
    {
        _dbContext = dbContext;
        _currentUser = currentUser;
    }

    public async Task<ListingCaseResponseDTO?> CreateAsync(
        CreateListingCaseRequestDTO request,
        CancellationToken cancellationToken)
    {
        if (_currentUser.Role != Enums.UserRole.Agent ||
            _currentUser.UserId is not Guid agentUserId)
        {
            return null;
        }

        var isCompanyAgent = await _dbContext.CompanyAgents
            .AnyAsync(
                relationship =>
                    relationship.AgentUserId == agentUserId &&
                    relationship.PhotographyCompanyId ==
                        request.PhotographyCompanyId,
                cancellationToken);

        if (!isCompanyAgent)
        {
            return null;
        }

        var listingCase = new ListingCase
        {
            Id = Guid.NewGuid(),
            PhotographyCompanyId = request.PhotographyCompanyId,
            AgentUserId = agentUserId,
            Address = request.Address.Trim(),
            Bedrooms = request.Bedrooms,
            Bathrooms = request.Bathrooms,
            Garages = request.Garages,
            Area = request.Area
        };

        _dbContext.ListingCases.Add(listingCase);

        await _dbContext.SaveChangesAsync(cancellationToken);

        return MapToResponse(listingCase);
    }

    public async Task<ListingCaseResponseDTO?> GetByIdAsync(
        Guid id,
        CancellationToken cancellationToken)
    {
        var query = _dbContext.ListingCases.AsNoTracking();

        query = _currentUser.Role switch
        {
            Enums.UserRole.Agent
                when _currentUser.UserId is Guid userId =>
                query.Where(item => item.AgentUserId == userId),

            Enums.UserRole.Admin or Enums.UserRole.Staff
                when _currentUser.PhotographyCompanyId is Guid companyId =>
                query.Where(item =>
                    item.PhotographyCompanyId == companyId),

            _ => query.Where(_ => false)
        };

        var listingCase = await query.FirstOrDefaultAsync(
            item => item.Id == id,
            cancellationToken);

        return listingCase is null
            ? null
            : MapToResponse(listingCase);
    }

    private static ListingCaseResponseDTO MapToResponse(ListingCase listingCase)
    {
        return new ListingCaseResponseDTO
        {
            Id = listingCase.Id,
            PhotographyCompanyId = listingCase.PhotographyCompanyId,
            AgentUserId = listingCase.AgentUserId,
            Address = listingCase.Address,
            Status = listingCase.Status,
            Bedrooms = listingCase.Bedrooms,
            Bathrooms = listingCase.Bathrooms,
            Garages = listingCase.Garages,
            Area = listingCase.Area,
            CreatedAt = listingCase.CreatedAt,
            UpdatedAt = listingCase.UpdatedAt
        };
    }
}
