using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Recam.Api.Data.Migrations
{
    /// <inheritdoc />
    public partial class AddListingCaseOwnership : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "Address",
                table: "ListingCases",
                type: "character varying(300)",
                maxLength: 300,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.AddColumn<Guid>(
                name: "AgentUserId",
                table: "ListingCases",
                type: "uuid",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<Guid>(
                name: "PhotographyCompanyId",
                table: "ListingCases",
                type: "uuid",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.Sql(
                """
                UPDATE "ListingCases"
                SET
                    "PhotographyCompanyId" = '11111111-1111-1111-1111-111111111111',
                    "AgentUserId" = '44444444-4444-4444-4444-444444444444'
                WHERE
                    "PhotographyCompanyId" = '00000000-0000-0000-0000-000000000000'
                    OR "AgentUserId" = '00000000-0000-0000-0000-000000000000';
                """);

            migrationBuilder.CreateIndex(
                name: "IX_ListingCases_AgentUserId_Id",
                table: "ListingCases",
                columns: new[] { "AgentUserId", "Id" });

            migrationBuilder.CreateIndex(
                name: "IX_ListingCases_PhotographyCompanyId_Id",
                table: "ListingCases",
                columns: new[] { "PhotographyCompanyId", "Id" });

            migrationBuilder.AddForeignKey(
                name: "FK_ListingCases_AspNetUsers_AgentUserId",
                table: "ListingCases",
                column: "AgentUserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_ListingCases_PhotographyCompanies_PhotographyCompanyId",
                table: "ListingCases",
                column: "PhotographyCompanyId",
                principalTable: "PhotographyCompanies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ListingCases_AspNetUsers_AgentUserId",
                table: "ListingCases");

            migrationBuilder.DropForeignKey(
                name: "FK_ListingCases_PhotographyCompanies_PhotographyCompanyId",
                table: "ListingCases");

            migrationBuilder.DropIndex(
                name: "IX_ListingCases_AgentUserId_Id",
                table: "ListingCases");

            migrationBuilder.DropIndex(
                name: "IX_ListingCases_PhotographyCompanyId_Id",
                table: "ListingCases");

            migrationBuilder.DropColumn(
                name: "AgentUserId",
                table: "ListingCases");

            migrationBuilder.DropColumn(
                name: "PhotographyCompanyId",
                table: "ListingCases");

            migrationBuilder.AlterColumn<string>(
                name: "Address",
                table: "ListingCases",
                type: "text",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "character varying(300)",
                oldMaxLength: 300);
        }
    }
}
