using EFCoreDatabase;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Server.Common;
using Server.Common.Configuration;
using Server.Services;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Server.Controllers.Shops.Products
{
    [Route("shops/{shopId}/products/{productId}/images")]
    [ApiController]
    public class ImagesController : ApiControllerBase
    {
        public ImagesController(AppDbContext database, IAuthorizationService authorizationService) : base(database, authorizationService)
        {

        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> CreateImage(
            [FromRoute]Guid shopId,
            [FromRoute]Guid productId,
            [FromForm(Name = "image")]IFormFile image,
            [FromServices]IFileSystemService fileSystemService,
            [FromServices]IImageProcessingService imageProcessingService,
            [FromServices]ApplicationConfiguration applicationConfiguration)
        {
            var shop = await _database.Shops.FirstOrDefaultAsync(shop => shop.Id == shopId);
            await AuthorizeShopOwner(shop);

            var product = await _database.Products.FirstOrDefaultAsync(product => product.Id == productId);

            var generatedFilename = await fileSystemService.SaveFileAsync(image, applicationConfiguration.PublicAssetsDirectory);
            var generatedThumbnailFilename = await imageProcessingService.GenerateThumbnailAsync(
                Path.Combine(applicationConfiguration.PublicAssetsDirectory, generatedFilename),
                applicationConfiguration.PublicAssetsDirectory,
                applicationConfiguration.Product.MaxImageThumbnailDimension);

            product.Images.Add(new DomainModel.ValueObjects.ThumbnailedImage()
            {
                Filename = generatedFilename,
                ThumbnailFilename = generatedThumbnailFilename
            });

            await _database.SaveChangesAsync();

            return Ok();
        }

        [HttpDelete("{filename}")]
        [Authorize]
        public async Task<IActionResult> DeleteImage(
            [FromRoute]Guid shopId,
            [FromRoute]Guid productId,
            [FromRoute]string filename,
            [FromServices]IFileSystemService fileSystemService,
            [FromServices]ApplicationConfiguration applicationConfiguration)
        {
            var shop = await _database.Shops.FirstOrDefaultAsync(shop => shop.Id == shopId);
            await AuthorizeShopOwner(shop);

            var product = await _database.Products.FirstOrDefaultAsync(product => product.Id == productId);

            var image = product.Images.FirstOrDefault(image => image.Filename == filename);

            await fileSystemService.DeleteFileAsync(applicationConfiguration.PublicAssetsDirectory, image.Filename);
            await fileSystemService.DeleteFileAsync(applicationConfiguration.PublicAssetsDirectory, image.ThumbnailFilename);

            product.Images.Remove(image);

            await _database.SaveChangesAsync();

            return Ok();
        }
    }
}
