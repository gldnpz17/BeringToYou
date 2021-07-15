using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace PostgresDatabase.Migrations
{
    public partial class InitialMigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "MapFloors",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    FloorNumber = table.Column<int>(type: "integer", nullable: false),
                    KmlFilename = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MapFloors", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "MapOverlays",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    FloorNumber = table.Column<int>(type: "integer", nullable: false),
                    ZIndex = table.Column<int>(type: "integer", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: false),
                    IconFilename = table.Column<string>(type: "text", nullable: true),
                    KmlFilename = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MapOverlays", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "OnlineShopPlatforms",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: false),
                    IconFilename = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OnlineShopPlatforms", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "PermissionPresets",
                columns: table => new
                {
                    Name = table.Column<string>(type: "text", nullable: false),
                    CanManageAccounts = table.Column<bool>(type: "boolean", nullable: false),
                    CanManagePermissions = table.Column<bool>(type: "boolean", nullable: false),
                    CanManageMap = table.Column<bool>(type: "boolean", nullable: false),
                    CanManageShops = table.Column<bool>(type: "boolean", nullable: false),
                    CanManageBackups = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PermissionPresets", x => x.Name);
                });

            migrationBuilder.CreateTable(
                name: "PointOfInterestCategories",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: false),
                    IconFilename = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PointOfInterestCategories", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ProductCategories",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: false),
                    ThumbnailFilename = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProductCategories", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ShopCategories",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: false),
                    IconFilename = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ShopCategories", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Accounts",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Username = table.Column<string>(type: "text", nullable: false),
                    Email = table.Column<string>(type: "text", nullable: true),
                    DisplayName = table.Column<string>(type: "text", nullable: false),
                    ProfilePictureFilename = table.Column<string>(type: "text", nullable: true),
                    EmailVerified = table.Column<bool>(type: "boolean", nullable: false),
                    Discriminator = table.Column<string>(type: "text", nullable: false),
                    PermissionsName = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Accounts", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Accounts_PermissionPresets_PermissionsName",
                        column: x => x.PermissionsName,
                        principalTable: "PermissionPresets",
                        principalColumn: "Name",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "PointOfInterests",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    CategoryId = table.Column<Guid>(type: "uuid", nullable: true),
                    FloorNumber = table.Column<int>(type: "integer", nullable: false),
                    Latitude = table.Column<double>(type: "double precision", nullable: false),
                    Longitude = table.Column<double>(type: "double precision", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PointOfInterests", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PointOfInterests_PointOfInterestCategories_CategoryId",
                        column: x => x.CategoryId,
                        principalTable: "PointOfInterestCategories",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "AuthenticationTokens",
                columns: table => new
                {
                    AccountId = table.Column<Guid>(type: "uuid", nullable: false),
                    AccountId1 = table.Column<Guid>(type: "uuid", nullable: false),
                    Token = table.Column<string>(type: "text", nullable: false),
                    Expired = table.Column<DateTime>(type: "timestamp without time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AuthenticationTokens", x => x.AccountId);
                    table.ForeignKey(
                        name: "FK_AuthenticationTokens_Accounts_AccountId1",
                        column: x => x.AccountId1,
                        principalTable: "Accounts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "BackupCodeCredentials",
                columns: table => new
                {
                    AccountId = table.Column<Guid>(type: "uuid", nullable: false),
                    BackupCodeAttemptMistakeClear = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    BackupCodeAttemptMistakeCounter = table.Column<int>(type: "integer", nullable: false),
                    BackupCodeAttemptTimeoutExpired = table.Column<DateTime>(type: "timestamp without time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BackupCodeCredentials", x => x.AccountId);
                    table.ForeignKey(
                        name: "FK_BackupCodeCredentials_Accounts_AccountId",
                        column: x => x.AccountId,
                        principalTable: "Accounts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "EmailVerificationTokens",
                columns: table => new
                {
                    Token = table.Column<string>(type: "text", nullable: false),
                    AccountId = table.Column<Guid>(type: "uuid", nullable: false),
                    Expired = table.Column<DateTime>(type: "timestamp without time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EmailVerificationTokens", x => x.Token);
                    table.ForeignKey(
                        name: "FK_EmailVerificationTokens_Accounts_AccountId",
                        column: x => x.AccountId,
                        principalTable: "Accounts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "MerchantVerificationRequests",
                columns: table => new
                {
                    AccountId = table.Column<Guid>(type: "uuid", nullable: false),
                    Accepted = table.Column<bool>(type: "boolean", nullable: false),
                    Expired = table.Column<DateTime>(type: "timestamp without time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MerchantVerificationRequests", x => x.AccountId);
                    table.ForeignKey(
                        name: "FK_MerchantVerificationRequests_Accounts_AccountId",
                        column: x => x.AccountId,
                        principalTable: "Accounts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "PasswordCredentials",
                columns: table => new
                {
                    AccountId = table.Column<Guid>(type: "uuid", nullable: false),
                    Hash = table.Column<string>(type: "text", nullable: true),
                    Salt = table.Column<string>(type: "text", nullable: true),
                    PasswordAttemptMistakeClear = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    PasswordAttemptMistakeCounter = table.Column<int>(type: "integer", nullable: false),
                    PasswordAttemptTimeoutExpired = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    ResetToken = table.Column<string>(type: "text", nullable: true),
                    ResetTokenExpired = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    ResetAttemptMistakeClear = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    ResetAttemptMistakeCounter = table.Column<int>(type: "integer", nullable: false),
                    ResetAttemptTimeoutExpired = table.Column<DateTime>(type: "timestamp without time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PasswordCredentials", x => x.AccountId);
                    table.ForeignKey(
                        name: "FK_PasswordCredentials_Accounts_AccountId",
                        column: x => x.AccountId,
                        principalTable: "Accounts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "TotpCredentials",
                columns: table => new
                {
                    AccountId = table.Column<Guid>(type: "uuid", nullable: false),
                    AesEncryptedSharedSecret = table.Column<string>(type: "text", nullable: true),
                    Base32EncodedInitializationVector = table.Column<string>(type: "text", nullable: true),
                    VerificationTimeoutEnd = table.Column<DateTime>(type: "timestamp without time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TotpCredentials", x => x.AccountId);
                    table.ForeignKey(
                        name: "FK_TotpCredentials_Accounts_AccountId",
                        column: x => x.AccountId,
                        principalTable: "Accounts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "TwoFactorToken",
                columns: table => new
                {
                    AccountBaseId = table.Column<Guid>(type: "uuid", nullable: false),
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Token = table.Column<string>(type: "text", nullable: true),
                    Expiry = table.Column<DateTime>(type: "timestamp without time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TwoFactorToken", x => new { x.AccountBaseId, x.Id });
                    table.ForeignKey(
                        name: "FK_TwoFactorToken_Accounts_AccountBaseId",
                        column: x => x.AccountBaseId,
                        principalTable: "Accounts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "BackupCode",
                columns: table => new
                {
                    BackupCodeCredentialAccountId = table.Column<Guid>(type: "uuid", nullable: false),
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    HashedCode = table.Column<string>(type: "text", nullable: true),
                    Salt = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BackupCode", x => new { x.BackupCodeCredentialAccountId, x.Id });
                    table.ForeignKey(
                        name: "FK_BackupCode_BackupCodeCredentials_BackupCodeCredentialAccoun~",
                        column: x => x.BackupCodeCredentialAccountId,
                        principalTable: "BackupCodeCredentials",
                        principalColumn: "AccountId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "MerchantVerificationPhoto",
                columns: table => new
                {
                    MerchantVerificationRequestAccountId = table.Column<Guid>(type: "uuid", nullable: false),
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Filename = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MerchantVerificationPhoto", x => new { x.MerchantVerificationRequestAccountId, x.Id });
                    table.ForeignKey(
                        name: "FK_MerchantVerificationPhoto_MerchantVerificationRequests_Merc~",
                        column: x => x.MerchantVerificationRequestAccountId,
                        principalTable: "MerchantVerificationRequests",
                        principalColumn: "AccountId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Shops",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: false),
                    BannerImage_Filename = table.Column<string>(type: "text", nullable: true),
                    BannerImage_ThumbnailFilename = table.Column<string>(type: "text", nullable: true),
                    Description = table.Column<string>(type: "character varying(1024)", maxLength: 1024, nullable: true),
                    Floor = table.Column<int>(type: "integer", nullable: false),
                    Latitude = table.Column<double>(type: "double precision", nullable: false),
                    Longitude = table.Column<double>(type: "double precision", nullable: false),
                    CategoryId = table.Column<Guid>(type: "uuid", nullable: true),
                    MerchantVerificationRequestAccountId = table.Column<Guid>(type: "uuid", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Shops", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Shops_MerchantVerificationRequests_MerchantVerificationRequ~",
                        column: x => x.MerchantVerificationRequestAccountId,
                        principalTable: "MerchantVerificationRequests",
                        principalColumn: "AccountId",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Shops_ShopCategories_CategoryId",
                        column: x => x.CategoryId,
                        principalTable: "ShopCategories",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "MerchantAccountShop",
                columns: table => new
                {
                    OwnedShopsId = table.Column<Guid>(type: "uuid", nullable: false),
                    ShopOwnersId = table.Column<Guid>(type: "uuid", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MerchantAccountShop", x => new { x.OwnedShopsId, x.ShopOwnersId });
                    table.ForeignKey(
                        name: "FK_MerchantAccountShop_Accounts_ShopOwnersId",
                        column: x => x.ShopOwnersId,
                        principalTable: "Accounts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_MerchantAccountShop_Shops_OwnedShopsId",
                        column: x => x.OwnedShopsId,
                        principalTable: "Shops",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "OnlineShopInstances",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    ShopId = table.Column<Guid>(type: "uuid", nullable: true),
                    PlatformId = table.Column<Guid>(type: "uuid", nullable: true),
                    Name = table.Column<string>(type: "text", nullable: false),
                    Url = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OnlineShopInstances", x => x.Id);
                    table.ForeignKey(
                        name: "FK_OnlineShopInstances_OnlineShopPlatforms_PlatformId",
                        column: x => x.PlatformId,
                        principalTable: "OnlineShopPlatforms",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_OnlineShopInstances_Shops_ShopId",
                        column: x => x.ShopId,
                        principalTable: "Shops",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Products",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    ShopId = table.Column<Guid>(type: "uuid", nullable: true),
                    Name = table.Column<string>(type: "text", nullable: false),
                    Description = table.Column<string>(type: "character varying(1024)", maxLength: 1024, nullable: true),
                    MinimumPrice = table.Column<int>(type: "integer", nullable: false),
                    MaximumPrice = table.Column<int>(type: "integer", nullable: false),
                    CategoryId = table.Column<Guid>(type: "uuid", nullable: true),
                    MainImage_Filename = table.Column<string>(type: "text", nullable: true),
                    MainImage_ThumbnailFilename = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Products", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Products_ProductCategories_CategoryId",
                        column: x => x.CategoryId,
                        principalTable: "ProductCategories",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Products_Shops_ShopId",
                        column: x => x.ShopId,
                        principalTable: "Shops",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Products_Images",
                columns: table => new
                {
                    ProductId = table.Column<Guid>(type: "uuid", nullable: false),
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Filename = table.Column<string>(type: "text", nullable: true),
                    ThumbnailFilename = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Products_Images", x => new { x.ProductId, x.Id });
                    table.ForeignKey(
                        name: "FK_Products_Images_Products_ProductId",
                        column: x => x.ProductId,
                        principalTable: "Products",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Accounts_PermissionsName",
                table: "Accounts",
                column: "PermissionsName");

            migrationBuilder.CreateIndex(
                name: "IX_AuthenticationTokens_AccountId1",
                table: "AuthenticationTokens",
                column: "AccountId1");

            migrationBuilder.CreateIndex(
                name: "IX_EmailVerificationTokens_AccountId",
                table: "EmailVerificationTokens",
                column: "AccountId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_MapFloors_FloorNumber",
                table: "MapFloors",
                column: "FloorNumber",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_MerchantAccountShop_ShopOwnersId",
                table: "MerchantAccountShop",
                column: "ShopOwnersId");

            migrationBuilder.CreateIndex(
                name: "IX_OnlineShopInstances_PlatformId",
                table: "OnlineShopInstances",
                column: "PlatformId");

            migrationBuilder.CreateIndex(
                name: "IX_OnlineShopInstances_ShopId",
                table: "OnlineShopInstances",
                column: "ShopId");

            migrationBuilder.CreateIndex(
                name: "IX_PointOfInterests_CategoryId",
                table: "PointOfInterests",
                column: "CategoryId");

            migrationBuilder.CreateIndex(
                name: "IX_Products_CategoryId",
                table: "Products",
                column: "CategoryId");

            migrationBuilder.CreateIndex(
                name: "IX_Products_ShopId",
                table: "Products",
                column: "ShopId");

            migrationBuilder.CreateIndex(
                name: "IX_Shops_CategoryId",
                table: "Shops",
                column: "CategoryId");

            migrationBuilder.CreateIndex(
                name: "IX_Shops_MerchantVerificationRequestAccountId",
                table: "Shops",
                column: "MerchantVerificationRequestAccountId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AuthenticationTokens");

            migrationBuilder.DropTable(
                name: "BackupCode");

            migrationBuilder.DropTable(
                name: "EmailVerificationTokens");

            migrationBuilder.DropTable(
                name: "MapFloors");

            migrationBuilder.DropTable(
                name: "MapOverlays");

            migrationBuilder.DropTable(
                name: "MerchantAccountShop");

            migrationBuilder.DropTable(
                name: "MerchantVerificationPhoto");

            migrationBuilder.DropTable(
                name: "OnlineShopInstances");

            migrationBuilder.DropTable(
                name: "PasswordCredentials");

            migrationBuilder.DropTable(
                name: "PointOfInterests");

            migrationBuilder.DropTable(
                name: "Products_Images");

            migrationBuilder.DropTable(
                name: "TotpCredentials");

            migrationBuilder.DropTable(
                name: "TwoFactorToken");

            migrationBuilder.DropTable(
                name: "BackupCodeCredentials");

            migrationBuilder.DropTable(
                name: "OnlineShopPlatforms");

            migrationBuilder.DropTable(
                name: "PointOfInterestCategories");

            migrationBuilder.DropTable(
                name: "Products");

            migrationBuilder.DropTable(
                name: "ProductCategories");

            migrationBuilder.DropTable(
                name: "Shops");

            migrationBuilder.DropTable(
                name: "MerchantVerificationRequests");

            migrationBuilder.DropTable(
                name: "ShopCategories");

            migrationBuilder.DropTable(
                name: "Accounts");

            migrationBuilder.DropTable(
                name: "PermissionPresets");
        }
    }
}
