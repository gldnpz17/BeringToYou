using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Server.Common.Auth
{
    public static class PolicyNameConstants
    {
        public const string AccountOwner = "AccountOwnerPolicy";
        public const string ShopOwner = "ShopOwnerPolicy";
        public const string AdminsOnly = "AdminsOnlyPolicy";
        public const string AuthenticatedUsers = "AuthenticatedUsersOnlyPolicy";

        public static class Admin
        {
            public const string CanManageAccounts = "CanManageAccountsPolicy";
            public const string CanManagePermissions = "CanManagePermissionPolicy";
            public const string CanManageMap = "CanManageMapPolicy";
            public const string CanManageShops = "CanManageShopsPolicy";
            public const string CanManageBackups = "CanManageBackupsPolicy";
        }
    }
}
