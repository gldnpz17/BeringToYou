using AutoMapper;
using DomainModel.Entities;
using EFCoreDatabase;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Server.Common;
using Server.Common.Configuration;
using Server.Models.Request;
using Server.Models.Response;
using Server.Services;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Controllers.Shops.Products
{
    [Route("api/shops/{shopId}/products/")]
    [ApiController]
    public class ProductsController : ApiControllerBase
    {
        public ProductsController(AppDbContext database, IAuthorizationService authorizationService) : base(database, authorizationService)
        {
        }

        [HttpPost]
        public async Task<IActionResult> CreateProduct(
            [FromRoute] Guid shopId,
            [FromBody] CreateProductBody body,
            [FromServices] IMapper mapper)
        {
            var shop = await _database.Shops.FirstOrDefaultAsync(shop => shop.Id == shopId);
            await AuthorizeShopOwner(shop);

            var newProduct = mapper.Map<Product>(body);

            var category = await _database.ProductCategories.FirstOrDefaultAsync(category => category.Name == body.CategoryName);
            newProduct.Category = category;

            shop.Products.Add(newProduct);

            await _database.SaveChangesAsync();

            return Ok();
        }

        [HttpGet]
        [AllowAnonymous]
        public async Task<IList<ProductSummary>> ReadAllProducts(
            [FromRoute] Guid shopId,
            [FromServices] IMapper mapper)
        {
            var shop = await _database.Shops.FirstOrDefaultAsync(shop => shop.Id == shopId);

            var products = shop.Products.ToList();

            var productSummaries = mapper.Map<List<Product>, List<ProductSummary>>(products);

            return productSummaries;
        }

        [HttpPut("{productId}")]
        public async Task<IActionResult> UpdateProduct(
            [FromRoute] Guid shopId,
            [FromRoute] Guid productId,
            [FromBody] UpdateProductBody body,
            [FromServices] IMapper mapper)
        {
            var shop = await _database.Shops.FirstOrDefaultAsync(shop => shop.Id == shopId);
            await AuthorizeShopOwner(shop);

            var product = await _database.Products.FirstOrDefaultAsync(product => product.Id == productId);

            mapper.Map(body, product);

            await _database.SaveChangesAsync();

            return Ok();
        }

        [HttpDelete("{productId}")]
        public async Task<IActionResult> DeleteProduct(
            [FromRoute] Guid shopId,
            [FromRoute] Guid productId)
        {
            var shop = await _database.Shops.FirstOrDefaultAsync(shop => shop.Id == shopId);
            await AuthorizeShopOwner(shop);

            var product = await _database.Products.FirstOrDefaultAsync(product => product.Id == productId);

            _database.Remove(product);

            await _database.SaveChangesAsync();

            return Ok();
        }

        [HttpPut("{productId}/main-image")]
        public async Task<IActionResult> UpdateMainImage(
            [FromRoute] Guid shopId,
            [FromRoute] Guid productId,
            [FromForm(Name = "image")] IFormFile image,
            [FromServices] IFileSystemService fileSystemService,
            [FromServices] IImageProcessingService imageProcessingService,
            [FromServices] ApplicationConfiguration applicationConfiguration)
        {
            var shop = await _database.Shops.FirstOrDefaultAsync(shop => shop.Id == shopId);
            await AuthorizeShopOwner(shop);

            var product = await _database.Products.FirstOrDefaultAsync(product => product.Id == productId);

            await fileSystemService.DeleteFileAsync(
                applicationConfiguration.PublicAssetsDirectory,
                product.MainImage.Filename);
            await fileSystemService.DeleteFileAsync(
                applicationConfiguration.PublicAssetsDirectory,
                product.MainImage.ThumbnailFilename);

            var generatedFilename = await fileSystemService.SaveFileAsync(image, applicationConfiguration.PublicAssetsDirectory);
            var generatedThumbnailFilename = await imageProcessingService.GenerateThumbnailAsync(
                Path.Combine(applicationConfiguration.PublicAssetsDirectory, generatedFilename),
                applicationConfiguration.PublicAssetsDirectory,
                applicationConfiguration.Product.MaxImageThumbnailDimension);

            product.MainImage = new DomainModel.ValueObjects.ThumbnailedImage()
            {
                Filename = generatedFilename,
                ThumbnailFilename = generatedThumbnailFilename
            };

            await _database.SaveChangesAsync();

            return Ok();
        }
    }
}