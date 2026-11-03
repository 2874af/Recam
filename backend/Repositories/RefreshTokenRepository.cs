using Microsoft.EntityFrameworkCore;
using Recam.Api.Data;
using Recam.Api.Entities;
using Recam.Api.Interfaces;

namespace Recam.Api.Repositories;

public sealed class RefreshTokenRepository(AppDbContext dbContext) : IRefreshTokenRepository
{
    public Task<RefreshToken?> FindByHashAsync(
        string tokenHash, bool includeUser, CancellationToken cancellationToken)
    {
        IQueryable<RefreshToken> query = dbContext.RefreshTokens;

        if (includeUser)
        {
            query = query.Include(token => token.User);
        }

        return query.SingleOrDefaultAsync(
            token => token.TokenHash == tokenHash, cancellationToken);
    }

    public Task<List<RefreshToken>> FindUnrevokedByUserAsync(
        Guid userId, CancellationToken cancellationToken)
    {
        return dbContext.RefreshTokens
            .Where(token => token.UserId == userId && token.RevokedAt == null)
            .ToListAsync(cancellationToken);
    }

    public void Add(RefreshToken token)
    {
        dbContext.RefreshTokens.Add(token);
    }

    public Task SaveChangesAsync(CancellationToken cancellationToken)
    {
        return dbContext.SaveChangesAsync(cancellationToken);
    }
}
