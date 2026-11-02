using Microsoft.AspNetCore.Mvc;
using Recam.Api.DTOs.Auth;
using Recam.Api.Interfaces;
using Microsoft.AspNetCore.Authorization;

namespace Recam.Api.Controllers;

[ApiController]
[Route("api/auth")]
[Tags("Auth")]
public class AuthController : ControllerBase
{
    private readonly IAuthService _authService;

    public AuthController(
        IAuthService authService)
    {
        _authService = authService;
    }

    [HttpPost("register")]
    [ProducesResponseType(
        typeof(AuthResponseDTO),
        StatusCodes.Status201Created)]
    [ProducesResponseType(
        StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> Register(
        RegisterRequestDTO request,
        CancellationToken cancellationToken)
    {
        var result =
            await _authService.RegisterAgentAsync(
                request,
                cancellationToken);

        if (!result.Succeeded)
        {
            return BadRequest(new
            {
                errors = result.Errors
            });
        }

        return StatusCode(
            StatusCodes.Status201Created,
            result.Response);
    }

    [HttpPost("login")]
    [ProducesResponseType(
        typeof(AuthResponseDTO),
        StatusCodes.Status200OK)]
    [ProducesResponseType(
        StatusCodes.Status401Unauthorized)]
    public async Task<IActionResult> Login(
        LoginRequestDTO request,
        CancellationToken cancellationToken)
    {
        var result =
            await _authService.LoginAsync(
                request,
                cancellationToken);

        if (!result.Succeeded)
        {
            return Unauthorized(new
            {
                errors = result.Errors
            });
        }

        return Ok(result.Response);
    }

    [HttpPost("refresh")]
    [ProducesResponseType(
        typeof(AuthResponseDTO),
        StatusCodes.Status200OK)]
    [ProducesResponseType(
        StatusCodes.Status401Unauthorized)]
    public async Task<IActionResult> Refresh(
        RefreshTokenRequestDTO request,
        CancellationToken cancellationToken)
    {
        var result =
            await _authService.RefreshAsync(
                request,
                cancellationToken);

        if (!result.Succeeded)
        {
            return Unauthorized(new
            {
                errors = result.Errors
            });
        }

        return Ok(result.Response);
    }

    [HttpPost("logout")]
    [ProducesResponseType(
        StatusCodes.Status204NoContent)]
    public async Task<IActionResult> Logout(
        RefreshTokenRequestDTO request,
        CancellationToken cancellationToken)
    {
        await _authService.LogoutAsync(
            request,
            cancellationToken);

        return NoContent();
    }

    [Authorize]
    [HttpGet("me")]
    [ProducesResponseType(
        typeof(AuthUserResponseDTO),
        StatusCodes.Status200OK)]
    [ProducesResponseType(
        StatusCodes.Status401Unauthorized)]
    public async Task<IActionResult> GetCurrentUser(
        CancellationToken cancellationToken)
    {
        var user =
            await _authService.GetCurrentUserAsync(
                cancellationToken);

        if (user is null)
        {
            return Unauthorized();
        }

        return Ok(user);
    }
}
