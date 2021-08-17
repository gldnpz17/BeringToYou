using AutoMapper;
using DomainModel.Entities;
using EFCoreDatabase;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NinjaNye.SearchExtensions;
using Server.Common;
using Server.Common.Auth;
using Server.Common.Exceptions;
using Server.Models.Request;
using Server.Models.Response;
using Server.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Controllers.Shops
{
    [Route("api/shops")]
    [ApiController]
    public class ShopsController : ApiControllerBase
    {
        public ShopsController(
            AppDbContext database,
            IAuthorizationService authorizationService) : base(database, authorizationService)
        {
        }

        [HttpPost]
        [Authorize(PolicyNameConstants.Admin.CanManageMap)]
        public async Task<IActionResult> CreateShop(
            [FromBody] CreateShopBody body,
            [FromServices] IMapper mapper)
        {
            var newShop = mapper.Map<Shop>(body);

            var category = await _database.ShopCategories.FirstOrDefaultAsync(category => category.Id == body.CategoryId);

            if (category == null)
            {
                throw new AppException(
                    AppExceptionCode.SHOP_CATEGORY_NOT_FOUND);
            }
            else
            {
                newShop.Category = category;
            }

            await _database.Shops.AddAsync(newShop);

            await _database.SaveChangesAsync();

            return Ok();
        }

        [HttpGet]
        [AllowAnonymous]
        public async Task<IList<ShopSummary>> GetAllShops(
            [FromQuery(Name = "keywords")] string rawQueryKeywords,
            [FromQuery(Name = "category")] string rawQueryCategoryId,
            [FromQuery(Name = "onlineshop")] string rawQueryOnlineShopPlatformIds,
            [FromQuery(Name = "minprice")] string rawQueryMinPrice,
            [FromQuery(Name = "maxprice")] string rawQueryMaxPrice,
            [FromQuery] int start,
            [FromQuery] int count,
            [FromServices] IPaginationService paginationService,
            [FromServices] IMapper mapper)
        {
            var queryKeywords = rawQueryKeywords?.Split(' ').Select(raw => raw.ToLower()).ToArray() ?? Array.Empty<string>();

            var queryCategoryId = Guid.Empty;
            if (rawQueryCategoryId != null)
            {
                queryCategoryId = Guid.Parse(rawQueryCategoryId);
            }

            var queryOnlineShopPlatformIds = Array.Empty<Guid>();
            if (rawQueryOnlineShopPlatformIds != null)
            {
                queryOnlineShopPlatformIds = rawQueryOnlineShopPlatformIds?
                    .Split(' ')
                    .Select(platformId => Guid.Parse(platformId))
                    .ToArray();
            }

            var queryMinPrice = rawQueryMinPrice == null ? 0.0 : double.Parse(rawQueryMinPrice);
            var queryMaxPrice = rawQueryMaxPrice == null ? double.MaxValue : double.Parse(rawQueryMaxPrice);

            var shops = await paginationService.PaginateAsync(
                _database.Shops.Where(shop =>
                    (queryCategoryId == Guid.Empty || shop.Category.Id == queryCategoryId) &&
                    (queryOnlineShopPlatformIds.Any() == false || shop.OnlineShopInstances.Any(
                        onlineShop => queryOnlineShopPlatformIds.Any(platformId => platformId == onlineShop.Platform.Id))) &&
                    shop.MinPrice >= queryMinPrice && shop.MaxPrice <= queryMaxPrice
                ).Search(
                    shop => shop.LowercaseName,
                    shop => shop.LowercaseDescription
                ).Containing(queryKeywords).OrderBy(shop => shop.Name),
                start,
                count);

            return mapper.Map<IList<Shop>, List<ShopSummary>>(shops);
        }

        [HttpGet("{shopId}")]
        [AllowAnonymous]
        public async Task<ShopDetailed> GetShopDetails(
            [FromRoute] Guid shopId,
            [FromServices] IMapper mapper)
        {
            var shop = await _database.Shops.FirstOrDefaultAsync(shop => shop.Id == shopId);

            var mappedShop = mapper.Map<ShopDetailed>(shop);

            mappedShop.OwnerNames = shop.ShopOwners.Select(owner => owner?.DisplayName)?.ToList() ?? new List<string>();

            return mappedShop;
        }

        [HttpPut("{shopId}")]
        public async Task<IActionResult> UpdateShop(
            [FromRoute] Guid shopId,
            [FromBody] UpdateShopBody body,
            [FromServices] IMapper mapper)
        {
            var shop = await _database.Shops.FirstOrDefaultAsync(shop => shop.Id == shopId);

            await AuthorizeShopOwner(shop);

            mapper.Map(body, shop);

            var category = await _database.ShopCategories.FirstOrDefaultAsync(category => category.Id == body.CategoryId);

            if (category == null)
            {
                throw new AppException(
                    AppExceptionCode.SHOP_CATEGORY_NOT_FOUND);
            }

            shop.Category = category;

            shop.Subcategories.Clear();

            var categorySubcategoryIds = category.Subcategories.Select(subcategory => subcategory.Id).ToList();
            foreach (var subcategoryIdToAdd in body.SubcategoryIds)
            {
                if (categorySubcategoryIds.Contains(subcategoryIdToAdd))
                {
                    var subcategory = await _database.ShopSubcategories.FirstOrDefaultAsync(subcategory => subcategory.Id == subcategoryIdToAdd);

                    shop.Subcategories.Add(subcategory);
                }
            }

            await _database.SaveChangesAsync();

            return Ok();
        }

        [HttpDelete("{shopId}")]
        public async Task<IActionResult> DeleteShop([FromRoute] Guid shopId)
        {
            var shop = await _database.Shops.FirstOrDefaultAsync(shop => shop.Id == shopId);

            await AuthorizeShopOwner(shop);

            _database.Shops.Remove(shop);

            await _database.SaveChangesAsync();

            return Ok();
        }
    }
}