using DomainModel.Entities;
using EFCoreDatabase;
using Microsoft.AspNetCore.Authorization;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Server.Common.Auth.AuthorizationHandlers
{
    public class ShopOwnerAuthorizationHandler : AuthorizationHandler<ShopOwnerRequirement, Shop>
    {
        protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, ShopOwnerRequirement requirement, Shop resource)
        {
            var loggedInAccountId = Guid.Parse(context.User.FindFirst("AccountId").Value);

            var shopOwnerIds = new List<Guid>();
            foreach (var shopOwner in resource.ShopOwners)
            {
                shopOwnerIds.Add(shopOwner.Id);
            }

            var canManageShops = bool.Parse(context.User.FindFirst(PermissionNameConstants.CanManageShops).Value);

            if (shopOwnerIds.Contains(loggedInAccountId) || canManageShops)
            {
                context.Succeed(requirement);
            }

            return Task.CompletedTask;
        }
    }

    public class ShopOwnerRequirement : IAuthorizationRequirement { }
}
