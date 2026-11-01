using Microsoft.AspNetCore.Mvc;
using Recam.Api.DTOs;
using Recam.Api.Interfaces;

namespace Recam.Api.Controllers;

[ApiController]
[Route("api/listing-cases")]
public sealed class ListingCasesController : ControllerBase
{
    private readonly IListingCaseService _listingCaseService;

    public ListingCasesController(
        IListingCaseService listingCaseService)
    {
        _listingCaseService = listingCaseService;
    }

    [HttpPost]
    [ProducesResponseType<ListingCaseResponseDTO>(
        StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult<ListingCaseResponseDTO>> Create(
        CreateListingCaseRequestDTO request,
        CancellationToken cancellationToken)
    {
        var response = await _listingCaseService.CreateAsync(
            request,
            cancellationToken);

        return CreatedAtAction(
            nameof(GetById),
            new { id = response.Id },
            response);
    }

    [HttpGet("{id:guid}")]
    [ProducesResponseType<ListingCaseResponseDTO>(
        StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<ListingCaseResponseDTO>> GetById(
        Guid id,
        CancellationToken cancellationToken)
    {
        var response = await _listingCaseService.GetByIdAsync(
            id,
            cancellationToken);

        if (response is null)
        {
            return NotFound();
        }

        return Ok(response);
    }
}