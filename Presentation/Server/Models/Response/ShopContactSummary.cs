using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Server.Models.Response
{
    public class ShopContactSummary
    {
        public Guid Id { get; set; }

        public string ContactIdentity { get; set; }

        public string ContactUrl { get; set; }
    }
}
