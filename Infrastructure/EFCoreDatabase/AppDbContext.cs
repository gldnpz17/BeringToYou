using DomainModel.Entities;
using DomainModel.ValueObjects;
using Microsoft.EntityFrameworkCore;
using System;

namespace EFCoreDatabase
{
    public class AppDbContext : DbContext
    {
        public DbSet<AccountBase> Accounts { get; set; }
        public DbSet<AdminAccount> AdminAccounts { get; set; }
        public DbSet<MerchantAccount> MerchantAccounts { get; set; }
        public DbSet<AuthenticationToken> AuthenticationTokens { get; set; }
        public DbSet<BackupCodeCredential> BackupCodeCredentials { get; set; }
        public DbSet<EmailVerificationToken> EmailVerificationTokens { get; set; }
        public DbSet<MapFloor> MapFloors { get; set; }
        public DbSet<MapOverlay> MapOverlays { get; set; }
        public DbSet<MerchantVerificationRequest> MerchantVerificationRequests { get; set; }
        public DbSet<OnlineShopInstance> OnlineShopInstances { get; set; }
        public DbSet<OnlineShopPlatform> OnlineShopPlatforms { get; set; }
        public DbSet<PasswordCredential> PasswordCredentials { get; set; }
        public DbSet<AdminPermissionPreset> PermissionPresets { get; set; }
        public DbSet<PointOfInterest> PointOfInterests { get; set; }
        public DbSet<PointOfInterestCategory> PointOfInterestCategories { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<ProductCategory> ProductCategories { get; set; }
        public DbSet<Shop> Shops { get; set; }
        public DbSet<ShopCategory> ShopCategories { get; set; }
        public DbSet<TotpCredential> TotpCredentials { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            base.OnConfiguring(optionsBuilder);
            optionsBuilder.UseLazyLoadingProxies();
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<AccountBase>(entityBuilder =>
            {
                entityBuilder.OwnsMany(entity => entity.TwoFactorTokens);
            });

            builder.Entity<MerchantVerificationRequest>(entityBuilder =>
            {
                entityBuilder.OwnsMany(entity => entity.VerificationPhotos);
            });

            builder.Entity<AdminPermissionPreset>(entityBuilder =>
            {
                entityBuilder.HasData(new AdminPermissionPreset[]
                {
                    new AdminPermissionPreset()
                    {
                        Name = "SuperAdmin",
                        CanManageAccounts = true,
                        CanManageBackups = true,
                        CanManagePermissions = true,
                        CanManageShops = true,
                        CanManageMap = true
                    },
                    new AdminPermissionPreset()
                    {
                        Name = "Default",
                        CanManageAccounts = false,
                        CanManageBackups = false,
                        CanManagePermissions = false,
                        CanManageShops = false,
                        CanManageMap = false
                    }
                });
            });

            builder.Entity<BackupCodeCredential>(entityBuilder =>
            {
                entityBuilder.OwnsMany(entity => entity.BackupCodes);
            });

            builder.Entity<Shop>(entityBuilder =>
            {
                entityBuilder.OwnsOne(entity => entity.BannerImage);
            });

            builder.Entity<Product>(entityBuilder =>
            {
                entityBuilder.OwnsMany(entity => entity.Images);

                entityBuilder.OwnsOne(entity => entity.MainImage);
            });
        }
    }
}
