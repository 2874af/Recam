using Recam.Api.Entities;

namespace Recam.Api.Interfaces;

public interface ITokenService
{
    string CreateAccessToken(AppUser user);

    string GenerateRefreshToken();

    string HashRefreshToken(string refreshToken);
}