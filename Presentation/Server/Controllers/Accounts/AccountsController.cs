using AutoMapper;
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

namespace Server.Controllers.Accounts
{
    [Route("api/accounts")]
    [ApiController]
    public class AccountsController : ApiControllerBase
    {
        public AccountsController(
            AppDbContext database,
            IAuthorizationService authorizationService) : base(database, authorizationService)
        {

        }

        [HttpGet("{accountId}")]
        [Authorize]
        public async Task<AccountDetailed> GetAccountDetails(
            [FromRoute]Guid accountId,
            [FromServices]IMapper mapper)
        {
            var account = await _database.Accounts.FirstOrDefaultAsync(account => account.Id == accountId);

            var accountDetails = mapper.Map<AccountDetailed>(account);

            return accountDetails;
        }

        [HttpPut]
        [Authorize]
        public async Task<IActionResult> UpdateAccountDetails(
            [FromRoute]Guid accountId,
            [FromBody]UpdateAccountBody body,
            [FromServices]IMapper mapper)
        {
            await AuthorizeAccountOwner(accountId);

            var account = await _database.Accounts.FirstOrDefaultAsync(account => account.Id == accountId);

            mapper.Map(body, account);

            await _database.SaveChangesAsync();

            return Ok();
        }

        [HttpDelete]
        [Authorize]
        public async Task<IActionResult> DeleteAccount(
            [FromRoute]Guid accountId)
        {
            await AuthorizeAccountOwner(accountId, PermissionNameConstants.CanManageAccounts);

            var account = await _database.Accounts.FirstOrDefaultAsync(account => account.Id == accountId);

            _database.Accounts.Remove(account);

            await _database.SaveChangesAsync();

            return Ok();
        }
    }
}
