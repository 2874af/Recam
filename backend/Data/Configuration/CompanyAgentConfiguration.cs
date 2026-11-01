using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Recam.Api.Entities;

namespace Recam.Api.Data.Configurations;

public class CompanyAgentConfiguration
    : IEntityTypeConfiguration<CompanyAgent>
{
    public void Configure(
        EntityTypeBuilder<CompanyAgent> builder)
    {
        builder.HasKey(companyAgent => companyAgent.Id);

        builder.HasIndex(companyAgent => new
            {
                companyAgent.PhotographyCompanyId,
                companyAgent.AgentUserId
            })
            .IsUnique();

        builder.HasIndex(
            companyAgent => companyAgent.AgentUserId);

        builder.HasOne(companyAgent =>
                companyAgent.PhotographyCompany)
            .WithMany(company =>
                company.Agents)
            .HasForeignKey(companyAgent =>
                companyAgent.PhotographyCompanyId)
            .OnDelete(DeleteBehavior.Restrict);

        builder.HasOne(companyAgent =>
                companyAgent.AgentUser)
            .WithMany(user =>
                user.AgentCompanies)
            .HasForeignKey(companyAgent =>
                companyAgent.AgentUserId)
            .OnDelete(DeleteBehavior.Restrict);

        builder.HasQueryFilter(
            companyAgent => companyAgent.DeletedAt == null);
    }
}
