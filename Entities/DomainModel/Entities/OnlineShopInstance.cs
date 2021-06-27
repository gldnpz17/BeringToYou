using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DomainModel.Entities
{
    public class OnlineShopInstance
    {
        public virtual Guid Id { get; set; }
        public virtual Shop Shop { get; set; }
        public virtual OnlineShopPlatform Platform { get; set; }
        public virtual string Name { get; set; }
        public virtual string Url { get; set; }
    }
}
