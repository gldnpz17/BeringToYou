using Microsoft.EntityFrameworkCore.Migrations;

namespace PostgresDatabase.Migrations
{
    public partial class AddSubcategoryDefaultColor : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "RgbHexLegendColor",
                table: "ShopSubcategories",
                type: "text",
                nullable: false,
                defaultValue: "#FFFFFF",
                oldClrType: typeof(string),
                oldType: "text");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "RgbHexLegendColor",
                table: "ShopSubcategories",
                type: "text",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "text",
                oldDefaultValue: "#FFFFFF");
        }
    }
}
