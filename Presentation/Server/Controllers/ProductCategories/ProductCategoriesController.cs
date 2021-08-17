using AutoMapper;
using DomainModel.Entities;
using EFCoreDatabase;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Server.Common;
using Server.Common.Auth;
using Server.Common.Configuration;
using Server.Models.Request;
using Server.Models.Response;
using Server.Services;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Server.Controllers.ProductCategories
{
    [Route("api/product-categories")]
    [ApiController]
    public class ProductCategoriesController : ApiControllerBase
    {
        public ProductCategoriesController(AppDbContext database, IAuthorizationService authorizationService) : base(database, authorizationService)
        {
        }

        [HttpPost]
        [Authorize(PolicyNameConstants.Admin.CanManageShops)]
        public async Task<IActionResult> CreateProductCategory(
            [FromBody] CreateProductCategoryBody body,
            [FromServices] IMapper mapper)
        {
            var newProductCategory = mapper.Map<ProductCategory>(body);

            await _database.ProductCategories.AddAsync(newProductCategory);

            await _database.SaveChangesAsync();

            return Ok();
        }

        [HttpGet]
        [AllowAnonymous]
        public async Task<IList<ProductCategorySummary>> ReadAllProductCategories([FromServices] IMapper mapper)
        {
            var productCategories = await _database.ProductCategories.ToListAsync();

            var productCategorySummaries = mapper.Map<List<ProductCategory>, List<ProductCategorySummary>>(productCategories);

            return productCategorySummaries;
        }

        [HttpPut("{categoryId}")]
        [Authorize(PolicyNameConstants.Admin.CanManageShops)]
        public async Task<IActionResult> UpdateProductCategory(
            [FromRoute] Guid categoryId,
            [FromBody] UpdateProductCategoryBody body,
            [FromServices] IMapper mapper)
        {
            var productCategory = await _database.ProductCategories.FirstOrDefaultAsync(productCategory => productCategory.Id == categoryId);

            mapper.Map(body, productCategory);

            await _database.SaveChangesAsync();

            return Ok();
        }

        [HttpDelete("{categoryId}")]
        [Authorize(PolicyNameConstants.Admin.CanManageShops)]
        public async Task<IActionResult> DeleteProductCategory([FromRoute] Guid categoryId)
        {
            var productCategory = await _database.ProductCategories.FirstOrDefaultAsync(productCategory => productCategory.Id == categoryId);

            _database.ProductCategories.Remove(productCategory);

            await _database.SaveChangesAsync();

            return Ok();
        }

        [HttpPut("{categoryId}/thumbnail")]
        [Authorize(PolicyNameConstants.Admin.CanManageShops)]
        public async Task<IActionResult> UpdateProductCategoryThumbnailImage(
            [FromRoute] Guid categoryId,
            [FromForm] IFormFile thumbnailImage,
            [FromServices] IFileSystemService fileSystemService,
            [FromServices] ApplicationConfiguration applicationConfiguration)
        {
            var productCategory = await _database.ProductCategories.FirstOrDefaultAsync(productCategory => productCategory.Id == categoryId);

            await fileSystemService.DeleteFileAsync(applicationConfiguration.PublicAssetsDirectory, productCategory.ThumbnailFilename);

            var generatedFilename = await fileSystemService.SaveFileAsync(thumbnailImage, applicationConfiguration.PublicAssetsDirectory);

            productCategory.ThumbnailFilename = generatedFilename;

            await _database.SaveChangesAsync();

            return Ok();
        }
    }
}