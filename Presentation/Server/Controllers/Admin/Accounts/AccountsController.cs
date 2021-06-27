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
using System.Threading.Tasks;

namespace Server.Controllers.Admin.Accounts
{
    [Route("api/admin/accounts")]
    [ApiController]
    public class AccountsController : ApiControllerBase
    {
        public AccountsController(
            AppDbContext database,
            IAuthorizationService authorizationService) : base(database, authorizationService)
        {

        }

        [HttpPost]
        [Authorize(PolicyNameConstants.Admin.CanManageAccounts)]
        public async Task<IActionResult> CreateAdminAccount(
            [FromBody] CreateAccountBody body,
            [FromServices] IPasswordHasher passwordHasher,
            [FromServices] IAlphanumericRng alphanumericRng,
            [FromServices] DomainModelConfiguration domainModelConfiguration)
        {
            var defaultPermission = await _database.PermissionPresets.FirstOrDefaultAsync(preset => preset.Name == "Default");

            var account = new AdminAccount(
                body.Email,
                body.DisplayName,
                body.Password,
                defaultPermission,
                passwordHasher,
                alphanumericRng,
                domainModelConfiguration);

            await _database.Accounts.AddAsync(account);

            return Ok();
        }

        [HttpGet]
        [Authorize(PolicyNameConstants.AdminsOnly)]
        public async Task<IList<AccountSummary>> GetAllAccounts(
            [FromServices] IMapper mapper)
        {
            var accounts = await _database.AdminAccounts.ToListAsync();

            var accountSummaries = mapper.Map<List<AccountBase>, List<AccountSummary>>(accounts);

            return accountSummaries;
        }
    }
}
