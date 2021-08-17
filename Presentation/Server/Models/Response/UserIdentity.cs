using System;
using System.Collections.Generic;

namespace Server.Models.Response
{
    public class UserIdentity
    {
        public Guid AccountId { get; set; }
        public string Email { get; set; }
        public string DisplayName { get; set; }
        public string ProfilePictureFilename { get; set; }
        public string Username { get; set; }
        public bool IsAdmin { get; set; } = false;
        public PermissionPreset AdminPermissions { get; set; }
        public bool IsMerchant { get; set; } = false;
        public List<ShopSummary> OwnedShops { get; set; }
    }
}