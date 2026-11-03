using Recam.Api.DTOs;
using Recam.Api.Entities;
using Recam.Api.Interfaces;

namespace Recam.Api.Services;

public sealed class ListingCaseService : IListingCaseService
{
    private readonly IListingCaseRepository _repository;
    private readonly ICurrentUserContext _currentUser;

    public ListingCaseService(
        IListingCaseRepository repository,
        ICurrentUserContext currentUser)
    {
        _repository = repository;
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

        var isCompanyAgent = await _repository.IsCompanyAgentAsync(
            agentUserId,
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

        await _repository.AddAsync(listingCase, cancellationToken);

        return MapToResponse(listingCase);
    }

    public async Task<ListingCaseResponseDTO?> GetByIdAsync(
        Guid id,
        CancellationToken cancellationToken)
    {
        var listingCase = _currentUser.Role switch
        {
            Enums.UserRole.Agent
                when _currentUser.UserId is Guid userId =>
                await _repository.FindForAgentAsync(id, userId, cancellationToken),

            Enums.UserRole.Admin or Enums.UserRole.Staff
                when _currentUser.PhotographyCompanyId is Guid companyId =>
                await _repository.FindForCompanyAsync(id, companyId, cancellationToken),

            _ => null
        };

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
