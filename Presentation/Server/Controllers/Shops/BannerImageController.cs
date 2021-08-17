using DomainModel.ValueObjects;
using EFCoreDatabase;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Server.Common;
using Server.Common.Configuration;
using Server.Services;
using System;
using System.IO;
using System.Threading.Tasks;

namespace Server.Controllers.Shops
{
    [Route("api/shops/{shopId}/banner-image")]
    [ApiController]
    public class BannerImageController : ApiControllerBase
    {
        private readonly IFileSystemService _fileSystemService;
        private readonly IImageProcessingService _imageProcessingService;
        private readonly ApplicationConfiguration _applicationConfiguration;

        public BannerImageController(
            IFileSystemService fileSystemService,
            IImageProcessingService imageProcessingService,
            ApplicationConfiguration applicationConfiguration,
            AppDbContext database,
            IAuthorizationService authorizationService) : base(database, authorizationService)
        {
            _fileSystemService = fileSystemService;
            _imageProcessingService = imageProcessingService;
            _applicationConfiguration = applicationConfiguration;
        }

        [HttpPut]
        public async Task<IActionResult> UpdateBannerImage(
            [FromRoute] Guid shopId,
            [FromForm(Name = "image")] IFormFile image)
        {
            var shop = await _database.Shops.FirstOrDefaultAsync(shop => shop.Id == shopId);

            await AuthorizeShopOwner(shop);

            var originalFilename = await _fileSystemService.SaveFileAsync(image, _applicationConfiguration.PublicAssetsDirectory);

            var thumbnailFilename = await _imageProcessingService.GenerateThumbnailAsync(
                Path.Combine(_applicationConfiguration.PublicAssetsDirectory, originalFilename),
                _applicationConfiguration.PublicAssetsDirectory,
                _applicationConfiguration.Shop.MaxBannerImageThumbnailDimension);

            shop.BannerImage = new ThumbnailedImage()
            {
                Filename = originalFilename,
                ThumbnailFilename = thumbnailFilename
            };

            await _database.SaveChangesAsync();

            return Ok();
        }
    }
}