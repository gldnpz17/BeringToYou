using Microsoft.EntityFrameworkCore.Migrations;

namespace PostgresDatabase.Migrations
{
    public partial class ReviseDomainModel : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<double>(
                name: "MaxPrice",
                table: "Shops",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "MinPrice",
                table: "Shops",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "MaxPrice",
                table: "Shops");

            migrationBuilder.DropColumn(
                name: "MinPrice",
                table: "Shops");
        }
    }
}
