using Recam.Api.Entities;

namespace Recam.Api.Interfaces;

public interface IRefreshTokenRepository
{
    Task<RefreshToken?> FindByHashAsync(
        string tokenHash, bool includeUser, CancellationToken cancellationToken);

    Task<List<RefreshToken>> FindUnrevokedByUserAsync(
        Guid userId, CancellationToken cancellationToken);

    void Add(RefreshToken token);

    Task SaveChangesAsync(CancellationToken cancellationToken);
}
