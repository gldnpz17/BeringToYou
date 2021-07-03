using AutoMapper;
using DomainModel.Entities;
using EFCoreDatabase;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Server.Common;
using Server.Common.Auth;
using Server.Common.Exceptions;
using Server.Models.Request;
using Server.Models.Response;
using Server.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Server.Controllers.Shops
{
    [Route("shops")]
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
            [FromBody]CreateShopBody body,
            [FromServices]IMapper mapper)
        {
            var newShop = mapper.Map<Shop>(body);

            var category = await _database.ShopCategories.FirstOrDefaultAsync(category => category.Name == body.CategoryName);

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
            [FromQuery]string name,
            [FromQuery]string category,
            [FromQuery]int start,
            [FromQuery]int count,
            [FromServices]IPaginationService paginationService,
            [FromServices]IMapper mapper)
        {
            var shops = await paginationService.PaginateAsync(
                _database.Shops.Where(shop => shop.Name.Contains(name) && shop.Category.Name == category),
                start,
                count);

            return mapper.Map<IList<Shop>, List <ShopSummary>>(shops);
        }

        [HttpGet("{shopId}")]
        [AllowAnonymous]
        public async Task<ShopDetailed> GetShopDetails(
            [FromRoute]Guid shopId,
            [FromServices]IMapper mapper)
        {
            var shop = await _database.Shops.FirstOrDefaultAsync(shop => shop.Id == shopId);

            return mapper.Map<ShopDetailed>(shop);
        }

        [HttpPut("{shopId}")]
        [Authorize]
        public async Task<IActionResult> UpdateShop(
            [FromRoute]Guid shopId,
            [FromBody]UpdateShopBody body,
            [FromServices]IMapper mapper)
        {
            var shop = await _database.Shops.FirstOrDefaultAsync(shop => shop.Id == shopId);

            await AuthorizeShopOwner(shop);

            mapper.Map(body, shop);

            var category = await _database.ShopCategories.FirstOrDefaultAsync(category => category.Name == body.CategoryName);

            if (category == null)
            {
                throw new AppException(
                    AppExceptionCode.SHOP_CATEGORY_NOT_FOUND);
            }
            else
            {
                shop.Category = category;
            }

            await _database.SaveChangesAsync();

            return Ok();
        }

        [HttpDelete("shopId")]
        [Authorize]
        public async Task<IActionResult> DeleteShop([FromRoute]Guid shopId)
        {
            var shop = await _database.Shops.FirstOrDefaultAsync(shop => shop.Id == shopId);

            await AuthorizeShopOwner(shop);

            _database.Shops.Remove(shop);

            await _database.SaveChangesAsync();

            return Ok();
        }
    }
}
