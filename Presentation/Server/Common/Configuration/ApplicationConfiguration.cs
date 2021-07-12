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
        public AccountConfiguration Account { get; set; }
        public MerchantVerificationConfiguration MerchantVerification { get; set; }
        public ShopConfiguration Shop { get; set; }
        public ShopCategoryConfiguration ShopCategory { get; set; }
        public ProductConfiguration Product { get; set; }
        public FileSystemServiceConfiguration FileSystemService { get; set; }
        
        public string PublicAssetsDirectory { get; set; } = Path.Combine(Directory.GetCurrentDirectory(), "Files", "PublicAssets");

        public class AccountConfiguration
        {
            public string ProfilePictureDirectory { get; set; } = Path.Combine(Directory.GetCurrentDirectory(), "Files", "AccountProfilePicture");
            public string[] AllowedProfilePictureExtensions { get; set; } = new string[] { "png", "bmp", "jpg", "jpeg" };
        }

        public class MerchantVerificationConfiguration
        {
            public string PhotosDirectory { get; set; } = Path.Combine(Directory.GetCurrentDirectory(), "Files", "MerchantVerificationPhotos");
            public string[] AllowedPhotoExtensions { get; set; } = new string[] { "png", "bmp", "jpg", "jpeg" };
        }

        public class ShopConfiguration
        {
            public string BannerImageDirectory { get; set; } = Path.Combine(Directory.GetCurrentDirectory(), "Files", "ShopBannerImages");
            public string[] AllowedBannerImageExtensions { get; set; } = new string[] { "png", "bmp", "jpg", "jpeg" };
            public int MaxBannerImageSize { get; set; } = 1024 * 1024 * 10;
            public int MaxBannerImageThumbnailDimension { get; set; } = 512;
        }

        public class ShopCategoryConfiguration
        {
            public string IconDirectory { get; set; } = Path.Combine(Directory.GetCurrentDirectory(), "Files", "ShopCategoryIcons");
            public string[] AllowedIconExtensions { get; set; } = new string[] { "svg" };
            public int MaxIconSize { get; set; } = 256;
        }

        public class ProductConfiguration
        {
            public string[] AllowedImageExtensions { get; set; } = new string[] { "png", "bmp", "jpg", "jpeg" };
            public int MaxImageSize { get; set; } = 1024 * 1024 * 10;
            public int MaxImageThumbnailDimension { get; set; } = 512;
        }

        public class FileSystemServiceConfiguration
        {
            public int GeneratedFilenameLength { get; set; } = 32;
        }
    }
}
