﻿using Server.Services;
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
    public class ImageSharpImageProcessingService : IImageProcessingService
    {
        private readonly IFileSystemService _fileSystemService;

        public ImageSharpImageProcessingService(IFileSystemService fileSystemService)
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
                    if (originalImage.Width >= maxDimension)
                    {
                        resizedWidth = maxDimension;
                    }
                    else
                    {
                        resizedWidth = originalImage.Width;
                    }

                    resizedHeight = originalImage.Height * (resizedWidth / originalImage.Width);
                }
                else // If portrait, scale by height.
                {
                    if (originalImage.Height >= maxDimension)
                    {
                        resizedHeight = maxDimension;
                    }
                    else
                    {
                        resizedHeight = originalImage.Height;
                    }

                    resizedWidth = originalImage.Width * (resizedHeight / originalImage.Height);
                }

                originalImage.Mutate(operation =>
                {
                    operation.Resize(resizedWidth, resizedHeight);
                });

                var generatedPath = await _fileSystemService.GenerateNewFilename(
                    thumbnailDirectory, 
                    Path.GetExtension(originalImagePath));

                originalImage.Save(generatedPath);

                Configuration.Default.MemoryAllocator.ReleaseRetainedResources();

                return Path.GetFileName(generatedPath);
            }
        }
    }
}
