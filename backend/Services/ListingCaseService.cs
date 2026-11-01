using Microsoft.EntityFrameworkCore;
using Recam.Api.Data;
using Recam.Api.DTOs;
using Recam.Api.Entities;
using Recam.Api.Interfaces;

namespace Recam.Api.Services;

public sealed class ListingCaseService : IListingCaseService
{
    private readonly AppDbContext _dbContext;

    public ListingCaseService(AppDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<ListingCaseResponseDTO> CreateAsync(
        CreateListingCaseRequestDTO request,
        CancellationToken cancellationToken)
    {
        var listingCase = new ListingCase
        {
            Id = Guid.NewGuid(),
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
        var listingCase = await _dbContext.ListingCases
            .AsNoTracking()
            .FirstOrDefaultAsync(
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