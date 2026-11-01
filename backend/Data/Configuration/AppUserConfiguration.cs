using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Recam.Api.Entities;

namespace Recam.Api.Data.Configurations;

public class AppUserConfiguration
    : IEntityTypeConfiguration<AppUser>
{
    public void Configure(EntityTypeBuilder<AppUser> builder)
    {
        builder.Property(user => user.DisplayName)
            .IsRequired()
            .HasMaxLength(100);

        builder.Property(user => user.Role)
            .IsRequired()
            .HasConversion<int>();

        builder.HasIndex(user => user.NormalizedEmail)
            .IsUnique()
            .HasDatabaseName("EmailIndex");

        builder.HasOne(user => user.PhotographyCompany)
            .WithMany(company => company.Members)
            .HasForeignKey(user => user.PhotographyCompanyId)
            .OnDelete(DeleteBehavior.Restrict);

        builder.HasQueryFilter(
            user => user.DeletedAt == null);

        builder.ToTable(
            "AspNetUsers",
            table => table.HasCheckConstraint(
                "CK_AspNetUsers_RoleCompany",
                """
                (
                    ("Role" IN (1, 2)
                        AND "PhotographyCompanyId" IS NOT NULL)
                    OR
                    ("Role" = 3
                        AND "PhotographyCompanyId" IS NULL)
                )
                """));
    }
}
