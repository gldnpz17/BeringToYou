using Microsoft.EntityFrameworkCore.Migrations;

namespace PostgresDatabase.Migrations
{
    public partial class AddLowerCaseShopNameAndDescription : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "LowercaseDescription",
                table: "Shops",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "LowercaseName",
                table: "Shops",
                type: "text",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "LowercaseDescription",
                table: "Shops");

            migrationBuilder.DropColumn(
                name: "LowercaseName",
                table: "Shops");
        }
    }
}
