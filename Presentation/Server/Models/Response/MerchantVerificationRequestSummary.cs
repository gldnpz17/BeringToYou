﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Server.Models.Response
{
    public class MerchantVerificationRequestSummary
    {
        public AccountSummary Account { get; set; }
        public ShopSummary OwnedShop { get; set; }
        public bool Accepted { get; set; } = false;
        public DateTime Expired { get; set; }
    }
}
