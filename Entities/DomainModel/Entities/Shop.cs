using DomainModel.ValueObjects;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DomainModel.Entities
{
    public class Shop
    {
        public virtual Guid Id { get; set; }
        public virtual string Name { get; set; }
        public virtual ThumbnailedImage BannerImage { get; set; }
        public virtual string Description { get; set; }
        public virtual int Floor { get; set; }
        public virtual IList<MerchantAccount> ShopOwners { get; set; }
        public virtual double Latitude { get; set; }
        public virtual double Longitude { get; set; }
        public virtual ShopCategory Category { get; set; }
        public virtual IList<OnlineShopInstance> OnlineShopInstances { get; set; } = new List<OnlineShopInstance>();
        public virtual IList<Product> Products { get; set; } = new List<Product>();
    }
}
