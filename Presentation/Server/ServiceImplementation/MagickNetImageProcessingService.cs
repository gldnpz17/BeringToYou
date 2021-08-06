using ImageMagick;
using Server.Services;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace Server.ServiceImplementation
{
    public class MagickNetImageProcessingService : IImageProcessingService
    {
        private readonly IFileSystemService _fileSystemService;

        public MagickNetImageProcessingService(IFileSystemService fileSystemService)
        {
            ResourceLimits.LimitMemory(new Percentage(10));
            _fileSystemService = fileSystemService;
        }

        public async Task<string> GenerateThumbnailAsync(string originalImagePath, string thumbnailDirectory, int maxDimension)
        {
            using (var image = new MagickImage(originalImagePath))
            {
                var resizedWidth = 0;
                var resizedHeight = 0;

                // If landscape or square, scale by width.
                if (image.Width >= image.Height)
                {
                    if (image.Width >= maxDimension)
                    {
                        resizedWidth = maxDimension;
                    }
                    else
                    {
                        resizedWidth = image.Width;
                    }

                    resizedHeight = image.Height * (resizedWidth / image.Width);
                }
                else // If portrait, scale by height.
                {
                    if (image.Height >= maxDimension)
                    {
                        resizedHeight = maxDimension;
                    }
                    else
                    {
                        resizedHeight = image.Height;
                    }

                    resizedWidth = image.Width * (resizedHeight / image.Height);
                }

                var size = new MagickGeometry(resizedWidth, resizedHeight);

                image.Resize(size);

                var generatedPath = await _fileSystemService.GenerateNewFilename(
                    thumbnailDirectory,
                    Path.GetExtension(originalImagePath));

                await image.WriteAsync(generatedPath);

                return Path.GetFileName(generatedPath);
            }
        }
    }
}
