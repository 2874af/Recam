using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Recam.Api.Entities;

namespace Recam.Api.Data.Configurations;

public class PhotographyCompanyConfiguration
    : IEntityTypeConfiguration<PhotographyCompany>
{
    public void Configure(
        EntityTypeBuilder<PhotographyCompany> builder)
    {
        builder.HasKey(company => company.Id);

        builder.Property(company => company.Name)
            .IsRequired()
            .HasMaxLength(200);

        builder.HasIndex(company => company.Name);

        builder.HasQueryFilter(
            company => company.DeletedAt == null);
    }
}
