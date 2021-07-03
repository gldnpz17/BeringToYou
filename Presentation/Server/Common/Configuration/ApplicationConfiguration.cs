using System;
using System.Collections.Generic;
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
        
        public string PublicAssetsDirectory { get; set; }

        public class AccountConfiguration
        {
            public string ProfilePictureDirectory { get; set; }
            public string[] AllowedProfilePictureExtensions { get; set; }
            public int ProfilePictureWidthInPixels { get; set; }
            public int ProfilePictureHeightInPixels { get; set; }
        }

        public class MerchantVerificationConfiguration
        {
            public string PhotosDirectory { get; set; }
            public string[] AllowedPhotoExtensions { get; set; }
            public int PhotoWidthInPixels { get; set; }
            public int PhotoHeightInPixels { get; set; }
        }

        public class ShopConfiguration
        {
            public string BannerImageDirectory { get; set; }
            public string[] AllowedBannerImageExtensions { get; set; }
            public int MaxBannerImageSize { get; set; }
            public int MaxBannerImageThumbnailDimension { get; set; }
        }

        public class ShopCategoryConfiguration
        {
            public string IconDirectory { get; set; }
            public string[] AllowedIconExtensions { get; set; }
            public int MaxIconSize { get; set; }
        }

        public class ProductConfiguration
        {
            public string[] AllowedImageExtensions { get; set; }
            public int MaxImageSize { get; set; }
            public int MaxImageThumbnailDimension { get; set; }
        }

        public class FileSystemServiceConfiguration
        {
            public int GeneratedFilenameLength { get; set; }
        }
    }
}
