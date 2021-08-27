using System;
using System.Collections.Generic;

namespace Server.Models.Response
{
    public class MerchantAccountSummary
    {
        public Guid Id { get; set; }
        public string Email { get; set; }
        public string DisplayName { get; set; }
        public string Username { get; set; }
        public string ProfilePictureFilename { get; set; }
        public List<ShopSummary> OwnedShops { get; set; }
        public bool Verified { get; set; }
    }
}