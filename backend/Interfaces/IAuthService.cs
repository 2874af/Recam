using Recam.Api.DTOs.Auth;
using Recam.Api.Models;

namespace Recam.Api.Interfaces;

public interface IAuthService
{
    Task<AuthResult> RegisterAgentAsync(
        RegisterRequestDTO request,
        CancellationToken cancellationToken = default);

    Task<AuthResult> LoginAsync(
        LoginRequestDTO request,
        CancellationToken cancellationToken = default);

    Task<AuthResult> RefreshAsync(
        RefreshTokenRequestDTO request,
        CancellationToken cancellationToken = default);
    
    Task LogoutAsync(
        RefreshTokenRequestDTO request,
        CancellationToken cancellationToken = default);
}
