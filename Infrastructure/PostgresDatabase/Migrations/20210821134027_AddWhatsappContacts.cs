using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace PostgresDatabase.Migrations
{
    public partial class AddWhatsappContacts : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "LowercaseName",
                table: "ShopSubcategories",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "LowercaseName",
                table: "ShopCategories",
                type: "text",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "ShopContacts",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    ContactIdentity = table.Column<string>(type: "text", nullable: true),
                    ContactUrl = table.Column<string>(type: "text", nullable: true),
                    Discriminator = table.Column<string>(type: "text", nullable: false),
                    ShopId = table.Column<Guid>(type: "uuid", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ShopContacts", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ShopContacts_Shops_ShopId",
                        column: x => x.ShopId,
                        principalTable: "Shops",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ShopContacts_ShopId",
                table: "ShopContacts",
                column: "ShopId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ShopContacts");

            migrationBuilder.DropColumn(
                name: "LowercaseName",
                table: "ShopSubcategories");

            migrationBuilder.DropColumn(
                name: "LowercaseName",
                table: "ShopCategories");
        }
    }
}
