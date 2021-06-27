using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Server.Models.Request
{
    public class UpdateOnlineShopInstanceBody
    {
        public Guid PlatformId { get; set; }
        public string Name { get; set; }
        public string Url { get; set; }
    }
}
