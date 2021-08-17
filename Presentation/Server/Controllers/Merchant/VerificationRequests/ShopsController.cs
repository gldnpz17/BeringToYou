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

namespace Server.Controllers.Merchant.VerificationRequests
{
    [Route("api/merchant/verification-requests/{accountId}/shops")]
    [ApiController]
    public class ShopsController : ApiControllerBase
    {
        public ShopsController(
            AppDbContext database,
            IAuthorizationService authorizationService) : base(database, authorizationService)
        {
        }

        [HttpPost]
        public async Task<IActionResult> AddShopToMerchantVerificationRequest(
            [FromRoute] Guid accountId,
            [FromBody] AddShopToMerchantVerificationRequestBody body)
        {
            await AuthorizeAccountOwner(accountId);

            var account = await _database.MerchantAccounts.FirstOrDefaultAsync(account => account.Id == accountId);

            var shopToAdd = await _database.Shops.FirstOrDefaultAsync(shop => shop.Id == body.ShopId);

            account.VerificationRequest.OwnedShops.Add(shopToAdd);

            await _database.SaveChangesAsync();

            return Ok();
        }

        [HttpGet]
        public async Task<IList<ShopSummary>> GetAllMerchantVerificationShops(
            [FromRoute] Guid accountId,
            [FromServices] IMapper mapper)
        {
            await AuthorizeAccountOwner(accountId);

            var account = await _database.MerchantAccounts.FirstOrDefaultAsync(account => account.Id == accountId);

            if (account == null)
            {
                return null;
            }

            var shops = account.VerificationRequest.OwnedShops.ToList();

            return mapper.Map<List<Shop>, List<ShopSummary>>(shops);
        }

        [HttpDelete("{shopId}")]
        public async Task<IActionResult> RemoveMerchantVerificationShop(
            [FromRoute] Guid accountId,
            [FromRoute] Guid shopId)
        {
            await AuthorizeAccountOwner(accountId);

            var account = await _database.MerchantAccounts.FirstOrDefaultAsync(account => account.Id == accountId);

            var shopToRemove = account.VerificationRequest.OwnedShops.FirstOrDefault(shop => shop.Id == shopId);

            account.VerificationRequest.OwnedShops.Remove(shopToRemove);

            await _database.SaveChangesAsync();

            return Ok();
        }
    }
}