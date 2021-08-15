using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace PostgresDatabase.Migrations
{
    public partial class AddShopSubcategoryAndMapLegend : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "MapLegends",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    IconFilename = table.Column<string>(type: "text", nullable: true),
                    Label = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MapLegends", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ShopSubcategories",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    ShopCategoryId = table.Column<Guid>(type: "uuid", nullable: true),
                    Name = table.Column<string>(type: "text", nullable: false),
                    RgbHexLegendColor = table.Column<string>(type: "text", nullable: false),
                    ShopId = table.Column<Guid>(type: "uuid", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ShopSubcategories", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ShopSubcategories_ShopCategories_ShopCategoryId",
                        column: x => x.ShopCategoryId,
                        principalTable: "ShopCategories",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_ShopSubcategories_Shops_ShopId",
                        column: x => x.ShopId,
                        principalTable: "Shops",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ShopSubcategories_ShopCategoryId",
                table: "ShopSubcategories",
                column: "ShopCategoryId");

            migrationBuilder.CreateIndex(
                name: "IX_ShopSubcategories_ShopId",
                table: "ShopSubcategories",
                column: "ShopId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "MapLegends");

            migrationBuilder.DropTable(
                name: "ShopSubcategories");
        }
    }
}
