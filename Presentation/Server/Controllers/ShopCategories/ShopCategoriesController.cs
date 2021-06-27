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
        public async Task<IList<ShopCategorySummary>> ReadAllShopCategories([FromServices] IMapper mapper)
        {
            var shopCategories = await _database.ShopCategories.ToListAsync();

            var shopCategorySummaries = mapper.Map<List<ShopCategory>, List<ShopCategorySummary>>(shopCategories);

            return shopCategorySummaries;
        }

        [HttpPut("{categoryName}")]
        [Authorize(PolicyNameConstants.Admin.CanManageShops)]
        public async Task<IActionResult> UpdateShopCategory(
            [FromRoute] string categoryName,
            [FromBody] UpdateShopCategoryBody body,
            [FromServices] IMapper mapper)
        {
            var shopCategory = await _database.ShopCategories.FirstOrDefaultAsync(category => category.Name == categoryName);

            mapper.Map(body, shopCategory);

            await _database.SaveChangesAsync();

            return Ok();
        }

        [HttpDelete("{categoryName}")]
        [Authorize(PolicyNameConstants.Admin.CanManageShops)]
        public async Task<IActionResult> DeleteShopCategory([FromRoute] string categoryName)
        {
            var shopCategory = await _database.ShopCategories.FirstOrDefaultAsync(category => category.Name == categoryName);

            _database.ShopCategories.Remove(shopCategory);

            await _database.SaveChangesAsync();

            return Ok();
        }

        [HttpPut("{categoryName}/icon")]
        [Authorize(PolicyNameConstants.Admin.CanManageShops)]
        public async Task<IActionResult> UpdateShopCategoryIcon(
            [FromRoute] string categoryName,
            [FromForm(Name = "icon")] IFormFile icon,
            [FromServices] IFileSystemService fileSystemService,
            [FromServices] ApplicationConfiguration applicationConfiguration)
        {
            var shopCategory = await _database.ShopCategories.FirstOrDefaultAsync(category => category.Name == categoryName);

            var generatedFilename = await fileSystemService.SaveFileAsync(icon, applicationConfiguration.ShopCategory.IconDirectory);

            shopCategory.IconFilename = generatedFilename;

            await _database.SaveChangesAsync();

            return Ok();
        }
    }
}
