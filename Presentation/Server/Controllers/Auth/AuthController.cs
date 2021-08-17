using AutoMapper;
using DomainModel.Entities;
using EFCoreDatabase;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Server.Common;
using Server.Common.Auth;
using Server.Models.Response;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Server.Controllers.Auth
{
    [Route("api/auth")]
    [ApiController]
    public class AuthController : ApiControllerBase
    {
        private readonly IMapper _mapper;

        public AuthController(
            AppDbContext database,
            IAuthorizationService authorizationService,
            IMapper mapper) : base(database, authorizationService)
        {
            _mapper = mapper;
        }

        [HttpGet("get-identity")]
        [Authorize(PolicyNameConstants.AuthenticatedUsers)]
        public async Task<UserIdentity> GetIdentity()
        {
            var account = await GetLoggedInAccount();

            var identity = _mapper.Map<UserIdentity>(account);

            var adminQuery = await _database.AdminAccounts.FirstOrDefaultAsync(account => account.Id == identity.AccountId);
            if (adminQuery != null)
            {
                identity.IsAdmin = true;
                identity.AdminPermissions = _mapper.Map<PermissionPreset>(adminQuery.Permissions);
            }

            var merchantQuery = await _database.MerchantAccounts.FirstOrDefaultAsync(account => account.Id == identity.AccountId);
            if (merchantQuery != null)
            {
                identity.IsMerchant = true;
                identity.OwnedShops = _mapper.Map<IList<Shop>, List<ShopSummary>>(merchantQuery.OwnedShops);
            }

            return identity;
        }
    }
}