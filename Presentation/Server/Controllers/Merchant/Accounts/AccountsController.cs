using AutoMapper;
using DomainModel.Common;
using DomainModel.Entities;
using DomainModel.Services;
using EFCoreDatabase;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Server.Common;
using Server.Common.Auth;
using Server.Models.Request;
using Server.Models.Response;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Server.Controllers.Merchant.Accounts
{
    [Route("api/merchants/accounts")]
    [ApiController]
    public class AccountsController : ApiControllerBase
    {
        public AccountsController(
            AppDbContext database,
            IAuthorizationService authorizationService) : base(database, authorizationService)
        {

        }

        [HttpPost]
        [AllowAnonymous]
        public async Task<IActionResult> CreateMerchantAccount(
            [FromBody]SignUpMerchantBody body,
            [FromServices]IPasswordHasher passwordHasher,
            [FromServices]IAlphanumericRng alphanumericRng,
            [FromServices]IDateTimeService dateTimeService, 
            [FromServices]DomainModelConfiguration configuration)
        {
            var account = new MerchantAccount(
                body.Username,
                body.DisplayName,
                body.Password,
                dateTimeService,
                passwordHasher,
                alphanumericRng,
                configuration);

            await _database.MerchantAccounts.AddAsync(account);

            await _database.SaveChangesAsync();

            return Ok();
        }

        [HttpGet]
        [Authorize(PolicyNameConstants.AdminsOnly)]
        public async Task<IList<MerchantAccountSummary>> GetAllMerchantAccounts([FromServices]IMapper mapper)
        {
            var accounts = await _database.MerchantAccounts.ToListAsync();

            return mapper.Map<List<MerchantAccount>, List<MerchantAccountSummary>>(accounts);
        }

        [HttpGet("{accountId}")]
        [Authorize(PolicyNameConstants.AuthenticatedUsers)]
        public async Task<MerchantAccountDetailed> GetMerchantAccountDetails(
            [FromRoute] Guid accountId,
            [FromServices] IMapper mapper)
        {
            await AuthorizeAccountOwner(accountId, "CanManageAccounts");

            var account = await _database.MerchantAccounts.FirstOrDefaultAsync(account => account.Id == accountId);

            return mapper.Map<MerchantAccountDetailed>(account);
        }
    }
}
