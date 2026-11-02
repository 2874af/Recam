using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;
using Recam.Api.Data;
using Recam.Api.DTOs.Auth;
using Recam.Api.Entities;
using Recam.Api.Enums;
using Recam.Api.Interfaces;
using Recam.Api.Models;
using Recam.Api.Options;
using Microsoft.EntityFrameworkCore;

namespace Recam.Api.Services;

public class AuthService : IAuthService
{
    private readonly UserManager<AppUser> _userManager;
    private readonly AppDbContext _dbContext;
    private readonly ITokenService _tokenService;
    private readonly JwtOptions _jwtOptions;

    public AuthService(
        UserManager<AppUser> userManager,
        AppDbContext dbContext,
        ITokenService tokenService,
        IOptions<JwtOptions> jwtOptions)
    {
        _userManager = userManager;
        _dbContext = dbContext;
        _tokenService = tokenService;
        _jwtOptions = jwtOptions.Value;
    }

    public async Task<AuthResult> RegisterAgentAsync(
        RegisterRequestDTO request,
        CancellationToken cancellationToken = default)
    {
        var email = request.Email
            .Trim()
            .ToLowerInvariant();

        var existingUser =
            await _userManager.FindByEmailAsync(email);

        if (existingUser is not null)
        {
            return AuthResult.Failure(
                "An account with this email already exists.");
        }

        var user = new AppUser
        {
            Id = Guid.NewGuid(),
            UserName = email,
            Email = email,
            DisplayName = request.DisplayName.Trim(),
            Role = UserRole.Agent,
            PhotographyCompanyId = null,
            SecurityStamp = Guid.NewGuid().ToString(),
            ConcurrencyStamp = Guid.NewGuid().ToString()
        };

        await using var transaction =
            await _dbContext.Database.BeginTransactionAsync(
                cancellationToken);

        var createResult =
            await _userManager.CreateAsync(
                user,
                request.Password);

        if (!createResult.Succeeded)
        {
            await transaction.RollbackAsync(
                cancellationToken);

            return AuthResult.Failure(
                createResult.Errors
                    .Select(error => error.Description)
                    .ToArray());
        }

        var response = await CreateAuthResponseAsync(
            user,
            cancellationToken);

        await transaction.CommitAsync(
            cancellationToken);

        return AuthResult.Success(response);
    }

    public async Task<AuthResult> LoginAsync(
        LoginRequestDTO request,
        CancellationToken cancellationToken = default)
    {
        var email = request.Email
            .Trim()
            .ToLowerInvariant();

        var user =
            await _userManager.FindByEmailAsync(email);

        if (user is null)
        {
            return AuthResult.Failure(
                "Invalid email or password.");
        }

        var passwordIsValid =
            await _userManager.CheckPasswordAsync(
                user,
                request.Password);

        if (!passwordIsValid)
        {
            return AuthResult.Failure(
                "Invalid email or password.");
        }

        var response = await CreateAuthResponseAsync(
            user,
            cancellationToken);

        return AuthResult.Success(response);
    }

    public async Task<AuthResult> RefreshAsync(
        RefreshTokenRequestDTO request,
        CancellationToken cancellationToken = default)
    {
        var tokenHash =
            _tokenService.HashRefreshToken(
                request.RefreshToken);

        var storedToken =
            await _dbContext.RefreshTokens
                .Include(token => token.User)
                .SingleOrDefaultAsync(
                    token => token.TokenHash == tokenHash,
                    cancellationToken);

        if (storedToken is null ||
            !storedToken.IsActive)
        {
            return AuthResult.Failure(
                "Invalid or expired refresh token.");
        }

        var response = await CreateAuthResponseAsync(
            storedToken.User,
            cancellationToken,
            storedToken);

        return AuthResult.Success(response);
    }

    public async Task LogoutAsync(
        RefreshTokenRequestDTO request,
        CancellationToken cancellationToken = default)
    {
        var tokenHash =
            _tokenService.HashRefreshToken(
                request.RefreshToken);

        var storedToken =
            await _dbContext.RefreshTokens
                .SingleOrDefaultAsync(
                    token => token.TokenHash == tokenHash,
                    cancellationToken);

        if (storedToken is null ||
            !storedToken.IsActive)
        {
            return;
        }

        storedToken.RevokedAt =
            DateTimeOffset.UtcNow;

        await _dbContext.SaveChangesAsync(
            cancellationToken);
    }

    private async Task<AuthResponseDTO> CreateAuthResponseAsync(
        AppUser user,
        CancellationToken cancellationToken,
        RefreshToken? tokenToReplace = null)
    {
        var now = DateTimeOffset.UtcNow;

        var accessToken =
            _tokenService.CreateAccessToken(user);

        var refreshToken =
            _tokenService.GenerateRefreshToken();

        var storedRefreshToken = new RefreshToken
        {
            Id = Guid.NewGuid(),
            UserId = user.Id,
            User = user,
            TokenHash =
                _tokenService.HashRefreshToken(refreshToken),
            CreatedAt = now,
            ExpiresAt = now.AddDays(
                _jwtOptions.RefreshTokenDays)
        };

        _dbContext.RefreshTokens.Add(
            storedRefreshToken);
        
        if (tokenToReplace is not null)
        {
            tokenToReplace.RevokedAt = now;
            tokenToReplace.ReplacedByTokenId =
                storedRefreshToken.Id;
        }

        await _dbContext.SaveChangesAsync(
            cancellationToken);

        return new AuthResponseDTO
        {
            AccessToken = accessToken,
            RefreshToken = refreshToken,
            AccessTokenExpiresAt = now.AddMinutes(
                _jwtOptions.AccessTokenMinutes),
            User = new AuthUserResponseDTO
            {
                Id = user.Id,
                DisplayName = user.DisplayName,
                Email = user.Email!,
                Role = user.Role,
                PhotographyCompanyId =
                    user.PhotographyCompanyId
            }
        };
    }
}
