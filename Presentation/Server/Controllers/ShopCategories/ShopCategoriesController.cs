﻿using AutoMapper;
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
    [Route("api/shops/shop-categories")]
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

            var generatedFilename = await fileSystemService.SaveFileAsync(icon, applicationConfiguration.PublicAssetsDirectory);

            shopCategory.IconFilename = generatedFilename;

            await _database.SaveChangesAsync();

            return Ok();
        }

        [HttpPost("{categoryId}/subcategories")]
        [Authorize(PolicyNameConstants.Admin.CanManageShops)]
        public async Task<IActionResult> CreateShopSubcategory(
            [FromRoute] Guid categoryId,
            [FromBody] CreateShopSubcategoryBody body,
            [FromServices] IMapper mapper)
        {
            var category = await _database.ShopCategories.FirstOrDefaultAsync(category => category.Id == categoryId);

            if (category == null)
            {
                return NotFound();
            }

            var newSubcategory = mapper.Map<ShopSubcategory>(body);

            category.Subcategories.Add(newSubcategory);

            await _database.SaveChangesAsync();

            return Ok();
        }

        [HttpGet("{categoryId}/subcategories")]
        [AllowAnonymous]
        public async Task<IList<ShopSubcategorySummary>> ReadAllCategorySubcategories(
            [FromRoute] Guid categoryId,
            [FromServices] IMapper mapper)
        {
            var subcategories = await _database.ShopSubcategories
                .Where(subcategory => subcategory.ShopCategory.Id == categoryId)
                .ToListAsync();

            var summaries = mapper.Map<List<ShopSubcategory>, List<ShopSubcategorySummary>>(subcategories);

            return summaries;
        }
    }
}
