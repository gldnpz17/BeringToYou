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
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Server.Controllers.ShopCategories
{
    [Route("shops/shop-categories")]
    [ApiController]
    public class ShopCategoriesController : ApiControllerBase
    {
        public ShopCategoriesController(AppDbContext database, IAuthorizationService authorizationService) : base(database, authorizationService)
        {

        }

        [HttpPost]
        [Authorize(PolicyNameConstants.Admin.CanManageShops)]
        public async Task<IActionResult> CreateShopCategory(
            [FromBody] CreateShopCategoryBody body,
            [FromServices] IMapper mapper)
        {
            var newShopCategory = mapper.Map<ShopCategory>(body);

            await _database.ShopCategories.AddAsync(newShopCategory);

            await _database.SaveChangesAsync();

            return Ok();
        }

        [HttpGet]
        [AllowAnonymous]
        public async Task<IList<ShopCategorySummary>> ReadAllShopCategories([FromServices] IMapper mapper)
        {
            var shopCategories = await _database.ShopCategories.ToListAsync();

            var shopCategorySummaries = mapper.Map<List<ShopCategory>, List<ShopCategorySummary>>(shopCategories);

            return shopCategorySummaries;
        }

        [HttpPut("{categoryId}")]
        [Authorize(PolicyNameConstants.Admin.CanManageShops)]
        public async Task<IActionResult> UpdateShopCategory(
            [FromRoute] Guid categoryId,
            [FromBody] UpdateShopCategoryBody body,
            [FromServices] IMapper mapper)
        {
            var shopCategory = await _database.ShopCategories.FirstOrDefaultAsync(category => category.Id == categoryId);

            mapper.Map(body, shopCategory);

            await _database.SaveChangesAsync();

            return Ok();
        }

        [HttpDelete("{categoryId}")]
        [Authorize(PolicyNameConstants.Admin.CanManageShops)]
        public async Task<IActionResult> DeleteShopCategory([FromRoute] Guid categoryId)
        {
            var shopCategory = await _database.ShopCategories.FirstOrDefaultAsync(category => category.Id == categoryId);

            _database.ShopCategories.Remove(shopCategory);

            await _database.SaveChangesAsync();

            return Ok();
        }

        [HttpPut("{categoryId}/icon")]
        [Authorize(PolicyNameConstants.Admin.CanManageShops)]
        public async Task<IActionResult> UpdateShopCategoryIcon(
            [FromRoute] Guid categoryId,
            [FromForm(Name = "icon")] IFormFile icon,
            [FromServices] IFileSystemService fileSystemService,
            [FromServices] ApplicationConfiguration applicationConfiguration)
        {
            var shopCategory = await _database.ShopCategories.FirstOrDefaultAsync(category => category.Id == categoryId);

            var generatedFilename = await fileSystemService.SaveFileAsync(icon, applicationConfiguration.ShopCategory.IconDirectory);

            shopCategory.IconFilename = generatedFilename;

            await _database.SaveChangesAsync();

            return Ok();
        }
    }
}
