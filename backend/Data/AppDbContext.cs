using Microsoft.EntityFrameworkCore;
using Recam.Api.Entities;

namespace Recam.Api.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options)
        : base(options)
    {
    }

    public DbSet<ListingCase> ListingCases => Set<ListingCase>();
}