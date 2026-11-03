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
    private readonly IRefreshTokenRepository _refreshTokenRepository;
    private readonly ITokenService _tokenService;
    private readonly JwtOptions _jwtOptions;
    private readonly ICurrentUserContext _currentUser;

    private readonly IPasswordResetEmailSender _passwordResetEmailSender;
    

    public AuthService(
        UserManager<AppUser> userManager,
        AppDbContext dbContext,
        IRefreshTokenRepository refreshTokenRepository,
        ITokenService tokenService,
        IOptions<JwtOptions> jwtOptions,
        ICurrentUserContext currentUser,
        IPasswordResetEmailSender passwordResetEmailSender)
    {
        _userManager = userManager;
        _dbContext = dbContext;
        _refreshTokenRepository = refreshTokenRepository;
        _tokenService = tokenService;
        _jwtOptions = jwtOptions.Value;
        _currentUser = currentUser;
        _passwordResetEmailSender = passwordResetEmailSender;
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

    public async Task<AuthUserResponseDTO?>
        GetCurrentUserAsync(
            CancellationToken cancellationToken = default)
    {
        if (_currentUser.UserId is not Guid userId)
        {
            return null;
        }

        var user = await _dbContext.Users
            .AsNoTracking()
            .SingleOrDefaultAsync(
                user => user.Id == userId,
                cancellationToken);

        if (user is null)
        {
            return null;
        }

        return new AuthUserResponseDTO
        {
            Id = user.Id,
            DisplayName = user.DisplayName,
            Email = user.Email!,
            Role = user.Role,
            PhotographyCompanyId =
                user.PhotographyCompanyId
        };
    }

    public async Task<OperationResult> ChangePasswordAsync(
        ChangePasswordRequestDTO request,
        CancellationToken cancellationToken = default)
    {
        if (_currentUser.UserId is not Guid userId)
        {
            return OperationResult.Failure(
                "The current user could not be identified.");
        }

        var user = await _userManager.FindByIdAsync(
            userId.ToString());

        if (user is null)
        {
            return OperationResult.Failure(
                "The current user could not be found.");
        }

        var result = await _userManager.ChangePasswordAsync(
            user,
            request.CurrentPassword,
            request.NewPassword);

        if (!result.Succeeded)
        {
            return OperationResult.Failure(
                result.Errors
                    .Select(error => error.Description)
                    .ToArray());
        }

        var activeRefreshTokens =
            await _refreshTokenRepository.FindUnrevokedByUserAsync(
                userId, cancellationToken);

        var revokedAt = DateTimeOffset.UtcNow;

        foreach (var token in activeRefreshTokens)
        {
            token.RevokedAt = revokedAt;
        }

        await _refreshTokenRepository.SaveChangesAsync(
            cancellationToken);

        return OperationResult.Success();
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
            await _refreshTokenRepository.FindByHashAsync(
                tokenHash, includeUser: true, cancellationToken);

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
            await _refreshTokenRepository.FindByHashAsync(
                tokenHash, includeUser: false, cancellationToken);

        if (storedToken is null ||
            !storedToken.IsActive)
        {
            return;
        }

        storedToken.RevokedAt =
            DateTimeOffset.UtcNow;

        await _refreshTokenRepository.SaveChangesAsync(
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

        _refreshTokenRepository.Add(storedRefreshToken);

        if (tokenToReplace is not null)
        {
            tokenToReplace.RevokedAt = now;
            tokenToReplace.ReplacedByTokenId =
                storedRefreshToken.Id;
        }

        await _refreshTokenRepository.SaveChangesAsync(
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

    public async Task ForgotPasswordAsync(
        ForgotPasswordRequestDTO request,
        CancellationToken cancellationToken = default)
    {
        var email = request.Email
            .Trim()
            .ToLowerInvariant();

        var user =
            await _userManager.FindByEmailAsync(email);

        if (user is null)
        {
            return;
        }

        var resetToken =
            await _userManager
                .GeneratePasswordResetTokenAsync(user);

        await _passwordResetEmailSender
            .SendPasswordResetAsync(
                user.Email!,
                user.DisplayName,
                resetToken,
                cancellationToken);
    }

    public async Task<OperationResult> ResetPasswordAsync(
        ResetPasswordRequestDTO request,
        CancellationToken cancellationToken = default)
    {
        var email = request.Email
            .Trim()
            .ToLowerInvariant();

        var user =
            await _userManager.FindByEmailAsync(email);

        if (user is null)
        {
            return OperationResult.Failure(
                "Invalid password reset request.");
        }

        var resetToken =
            Uri.UnescapeDataString(request.Token);

        var result =
            await _userManager.ResetPasswordAsync(
                user,
                resetToken,
                request.NewPassword);

        if (!result.Succeeded)
        {
            return OperationResult.Failure(
                result.Errors
                    .Select(error => error.Description)
                    .ToArray());
        }

        var refreshTokens =
            await _refreshTokenRepository.FindUnrevokedByUserAsync(
                user.Id, cancellationToken);

        var revokedAt = DateTimeOffset.UtcNow;

        foreach (var token in refreshTokens)
        {
            token.RevokedAt = revokedAt;
        }

        await _refreshTokenRepository.SaveChangesAsync(
            cancellationToken);

        return OperationResult.Success();
    }
}
