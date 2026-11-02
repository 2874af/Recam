using Microsoft.EntityFrameworkCore;
using Recam.Api.Entities;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace Recam.Api.Data;

public class AppDbContext : IdentityUserContext<AppUser, Guid>
{
    public AppDbContext(DbContextOptions<AppDbContext> options)
        : base(options)
    {
    }

    public DbSet<ListingCase> ListingCases => Set<ListingCase>();

    public DbSet<PhotographyCompany> PhotographyCompanies
        => Set<PhotographyCompany>();

    public DbSet<CompanyAgent> CompanyAgents
        => Set<CompanyAgent>();
    
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.ApplyConfigurationsFromAssembly(
            typeof(AppDbContext).Assembly);
    }

    public DbSet<RefreshToken> RefreshTokens
        => Set<RefreshToken>();
}
