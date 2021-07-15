using Microsoft.AspNetCore.Authorization;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Server.Common.Auth.AuthorizationHandlers
{
    public class AccountOwnerAuthorizationHandler : AuthorizationHandler<AccountOwnerRequirement, (Guid accountId, string adminPermission)>
    {
        protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, AccountOwnerRequirement requirement, (Guid accountId, string adminPermission) resource)
        {
            var loggedInAccountId = Guid.Parse(context.User.FindFirst("AccountId").Value);

            var isAuthorizedAdmin = context.User.FindFirst(resource.adminPermission)?.Value == true.ToString();

            if (loggedInAccountId == resource.accountId || isAuthorizedAdmin)
            {
                context.Succeed(requirement);
            }

            return Task.CompletedTask;
        }
    }

    public class AccountOwnerRequirement : IAuthorizationRequirement { }
}
