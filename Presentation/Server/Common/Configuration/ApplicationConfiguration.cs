using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Server.Common.Configuration
{
    public class ApplicationConfiguration
    {
        public AccountConfiguration Account { get; set; } = new AccountConfiguration();
        public MerchantVerificationConfiguration MerchantVerification { get; set; } = new MerchantVerificationConfiguration();
        public ShopConfiguration Shop { get; set; } = new ShopConfiguration();
        public ShopCategoryConfiguration ShopCategory { get; set; } = new ShopCategoryConfiguration();
        public ProductConfiguration Product { get; set; } = new ProductConfiguration();
        public FileSystemServiceConfiguration FileSystemService { get; set; } = new FileSystemServiceConfiguration();

        public string PublicAssetsDirectory { get; set; } = Path.Combine(Directory.GetCurrentDirectory(), "public-assets");

        public class AccountConfiguration
        {
            public string ProfilePictureDirectory { get; set; } = Path.Combine(Directory.GetCurrentDirectory(), "profile-pictures");
            public string[] AllowedProfilePictureExtensions { get; set; } = new string[] { ".bmp", ".png", ".jpg", ".jpeg" };
            public int MaxProfilePictureFileSize { get; set; } = 1024 * 1024 * 5;
        }

        public class MerchantVerificationConfiguration
        {
            public string PhotosDirectory { get; set; } = Path.Combine(Directory.GetCurrentDirectory(), "merchant-verification-photos");
            public string[] AllowedPhotoExtensions { get; set; } = new string[] { ".bmp", ".png", ".jpg", ".jpeg" };
            public int MaxPhotoFileSize = 1024 * 1024 * 10;
        }

        public class ShopConfiguration
        {
            public string[] AllowedBannerImageExtensions { get; set; } = new string[] { ".bmp", ".png", ".jpg", ".jpeg" };
            public int MaxBannerImageSize { get; set; } = 1024 * 1024 * 10;
            public int MaxBannerImageThumbnailDimension { get; set; } = 1024;
        }

        public class ShopCategoryConfiguration
        {
            public string[] AllowedIconExtensions { get; set; } = new string[] { ".svg" };
            public int MaxIconSize { get; set; } = 1024 * 1024 * 10;
        }

        public class ProductConfiguration
        {
            public string[] AllowedImageExtensions { get; set; } = new string[] { ".bmp", ".png", ".jpg", ".jpeg" };
            public int MaxImageSize { get; set; } = 1024 * 1024 * 10;
            public int MaxImageThumbnailDimension { get; set; } = 768;
        }

        public class FileSystemServiceConfiguration
        {
            public int GeneratedFilenameLength { get; set; } = 64;
        }
    }
}
