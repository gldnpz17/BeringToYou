using System;
using System.Collections.Generic;

namespace Server.Models.Response
{
    public class MerchantVerificationRequestDetailed
    {
        public AccountSummary Account { get; set; }
        public bool Accepted { get; set; }
        public DateTime Expired { get; set; }
        public List<ShopSummary> OwnedShops { get; set; }
        public List<string> VerificationPhotoFilenames { get; set; }
    }
}