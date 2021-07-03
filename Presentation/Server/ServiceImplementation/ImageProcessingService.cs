using Server.Services;
using SixLabors.ImageSharp;
using SixLabors.ImageSharp.Processing;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Server.ServiceImplementation
{
    public class ImageProcessingService : IImageProcessingService
    {
        private readonly IFileSystemService _fileSystemService;

        public ImageProcessingService(IFileSystemService fileSystemService)
        {
            _fileSystemService = fileSystemService;
        }

        public async Task<string> GenerateThumbnailAsync(
            string originalImagePath, 
            string thumbnailDirectory, 
            int maxDimension)
        {
            using (var originalImage = Image.Load(originalImagePath))
            {
                var resizedWidth = 0;
                var resizedHeight = 0;

                // If landscape or square, scale by width.
                if (originalImage.Width >= originalImage.Height)
                {
                    resizedWidth = maxDimension;
                    resizedHeight = originalImage.Height * (resizedWidth / originalImage.Width);
                }
                else // If portrait, scale by height.
                {
                    resizedHeight = maxDimension;
                    resizedWidth = originalImage.Width * (resizedHeight / originalImage.Height);
                }

                originalImage.Mutate(operation =>
                {
                    operation.Resize(resizedWidth, resizedHeight);
                });

                var generatedPath = await _fileSystemService.CreateNewFile(
                    thumbnailDirectory, 
                    Path.GetExtension(originalImagePath));

                originalImage.Save(generatedPath);

                return Path.GetFileName(generatedPath);
            }
        }
    }
}
