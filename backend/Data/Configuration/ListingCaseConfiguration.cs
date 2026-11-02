using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Recam.Api.Entities;

namespace Recam.Api.Data.Configurations;

public sealed class ListingCaseConfiguration
    : IEntityTypeConfiguration<ListingCase>
{
    public void Configure(EntityTypeBuilder<ListingCase> builder)
    {
        builder.HasKey(listingCase => listingCase.Id);

        builder.Property(listingCase => listingCase.Address)
            .IsRequired()
            .HasMaxLength(300);

        builder.HasIndex(listingCase => new
        {
            listingCase.PhotographyCompanyId,
            listingCase.Id
        });

        builder.HasIndex(listingCase => new
        {
            listingCase.AgentUserId,
            listingCase.Id
        });

        builder.HasOne(listingCase => listingCase.PhotographyCompany)
            .WithMany(company => company.ListingCases)
            .HasForeignKey(listingCase =>
                listingCase.PhotographyCompanyId)
            .OnDelete(DeleteBehavior.Restrict);

        builder.HasOne(listingCase => listingCase.AgentUser)
            .WithMany(user => user.ListingCases)
            .HasForeignKey(listingCase => listingCase.AgentUserId)
            .OnDelete(DeleteBehavior.Restrict);
    }
}
