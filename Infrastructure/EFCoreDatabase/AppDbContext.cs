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

            builder.Entity<MapFloor>().HasIndex(entity => entity.FloorNumber).IsUnique();

            builder.Entity<MerchantVerificationRequest>(entityBuilder =>
            {
                entityBuilder.OwnsMany(entity => entity.VerificationPhotos);
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
