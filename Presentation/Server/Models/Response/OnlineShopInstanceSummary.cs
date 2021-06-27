using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Server.Models.Response
{
    public class OnlineShopInstanceSummary
    {
        public virtual Guid Id { get; set; }
        public virtual OnlineShopPlatformSummary Platform { get; set; }
        public virtual string Name { get; set; }
        public virtual string Url { get; set; }
    }
}
