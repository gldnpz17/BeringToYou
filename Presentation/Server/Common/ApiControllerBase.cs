using DomainModel.Entities;
using EFCoreDatabase;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Server.Common.Auth;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Server.Common
{
    public class ApiControllerBase : ControllerBase
    {
        private protected readonly AppDbContext _database;
        private protected readonly IAuthorizationService _authorizationService;

        public ApiControllerBase(AppDbContext database, IAuthorizationService authorizationService)
        {
            _database = database;
            _authorizationService = authorizationService;
        }

        private protected async Task<AccountBase> GetLoggedInAccount()
        {
            var accountId = Guid.Parse(HttpContext.User.FindFirst("UserId").Value);

            var account = await _database.Accounts.FirstOrDefaultAsync(account => account.Id == accountId);

            return account;
        } 

        private protected async Task AuthorizeAccountOwner(Guid accountId, string adminPermission = "")
        {
            await _authorizationService.AuthorizeAsync(User, (accountId, adminPermission), PolicyNameConstants.AccountOwner);
        }

        private protected async Task AuthorizeShopOwner(Shop shop)
        {
            await _authorizationService.AuthorizeAsync(User, shop, PolicyNameConstants.ShopOwner);
        }
    }
}
