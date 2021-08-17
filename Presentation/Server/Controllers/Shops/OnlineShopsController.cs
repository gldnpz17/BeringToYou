using AutoMapper;
using DomainModel.Entities;
using EFCoreDatabase;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Server.Common;
using Server.Models.Request;
using Server.Models.Response;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Controllers.Shops
{
    [Route("api/shops/{shopId}/online-shops")]
    [ApiController]
    public class OnlineShopsController : ApiControllerBase
    {
        public OnlineShopsController(AppDbContext database, IAuthorizationService authorizationService) : base(database, authorizationService)
        {
        }

        [HttpPost]
        public async Task<IActionResult> CreateOnlineShopInstance(
            [FromRoute] Guid shopId,
            [FromBody] CreateOnlineShopInstanceBody body,
            [FromServices] IMapper mapper)
        {
            var shop = await _database.Shops.FirstOrDefaultAsync(shop => shop.Id == shopId);
            await AuthorizeShopOwner(shop);

            var onlineShop = mapper.Map<OnlineShopInstance>(body);

            var platform = await _database.OnlineShopPlatforms.FirstOrDefaultAsync(platform => platform.Id == body.PlatformId);
            onlineShop.Platform = platform;

            shop.OnlineShopInstances.Add(onlineShop);

            await _database.SaveChangesAsync();

            return Ok();
        }

        [HttpGet]
        [AllowAnonymous]
        public async Task<IList<OnlineShopInstanceSummary>> ReadAllOnlineShopInstances(
            [FromRoute] Guid shopId,
            [FromServices] IMapper mapper)
        {
            var shop = await _database.Shops.FirstOrDefaultAsync(shop => shop.Id == shopId);

            var onlineShopSummaries = mapper.Map<List<OnlineShopInstance>, List<OnlineShopInstanceSummary>>(shop.OnlineShopInstances.ToList());

            return onlineShopSummaries;
        }

        [HttpPut("{onlineShopId}")]
        public async Task<IActionResult> UpdateOnlineShopInstance(
            [FromRoute] Guid shopId,
            [FromRoute] Guid onlineShopId,
            [FromBody] UpdateOnlineShopInstanceBody body,
            [FromServices] IMapper mapper)
        {
            var shop = await _database.Shops.FirstOrDefaultAsync(shop => shop.Id == shopId);
            await AuthorizeShopOwner(shop);

            var onlineShop = await _database.OnlineShopInstances.FirstOrDefaultAsync(onlineShop => onlineShop.Id == onlineShopId);

            mapper.Map(body, onlineShop);

            var platform = await _database.OnlineShopPlatforms.FirstOrDefaultAsync(platform => platform.Id == body.PlatformId);

            onlineShop.Platform = platform;

            await _database.SaveChangesAsync();

            return Ok();
        }

        [HttpDelete("{onlineShopId}")]
        public async Task<IActionResult> DeleteOnlineShopInstance([FromRoute] Guid shopId, [FromRoute] Guid onlineShopId)
        {
            var shop = await _database.Shops.FirstOrDefaultAsync(shop => shop.Id == shopId);
            await AuthorizeShopOwner(shop);

            var onlineShop = await _database.OnlineShopInstances.FirstOrDefaultAsync(onlineShop => onlineShop.Id == onlineShopId);

            _database.OnlineShopInstances.Remove(onlineShop);

            await _database.SaveChangesAsync();

            return Ok();
        }
    }
}