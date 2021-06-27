using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DomainModel.Entities
{
    public class OnlineShopPlatform
    {
        public virtual Guid Id { get; set; }
        public virtual string Name { get; set; }
        public virtual string IconFilename { get; set; }
    }
}
