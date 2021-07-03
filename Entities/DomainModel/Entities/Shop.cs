using DomainModel.ValueObjects;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DomainModel.Entities
{
    public class Shop
    {
        [Key]
        public virtual Guid Id { get; set; }

        [Required]
        public virtual string Name { get; set; }

        public virtual ThumbnailedImage BannerImage { get; set; }

        [MaxLength(1024)]
        public virtual string Description { get; set; }

        public virtual IList<MerchantAccount> ShopOwners { get; set; }

        [Required]
        public virtual int Floor { get; set; }

        [Required]
        public virtual double Latitude { get; set; }

        [Required]
        public virtual double Longitude { get; set; }
        
        public virtual ShopCategory Category { get; set; }
        
        public virtual IList<OnlineShopInstance> OnlineShopInstances { get; set; } = new List<OnlineShopInstance>();
        
        public virtual IList<Product> Products { get; set; } = new List<Product>();
    }
}
