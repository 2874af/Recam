using Microsoft.AspNetCore.Mvc;
using Recam.Api.DTOs;
using Recam.Api.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Recam.Api.Authorization;

namespace Recam.Api.Controllers;

[ApiController]
[Route("api/listing-cases")]
[Authorize]
public sealed class ListingCasesController : ControllerBase
{
    private readonly IListingCaseService _listingCaseService;

    public ListingCasesController(
        IListingCaseService listingCaseService)
    {
        _listingCaseService = listingCaseService;
    }

    [HttpPost]
    [Authorize(Policy = AuthorizationPolicies.AgentOnly)]
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

        if (response is null)
        {
            return Forbid();
        }

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
