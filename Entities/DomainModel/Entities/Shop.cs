using DomainModel.ValueObjects;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace DomainModel.Entities
{
    public class Shop
    {
        [Key]
        public Guid Id { get; set; }

        [Required]
        public string Name { get; set; }

        public string LowercaseName { get; set; }

        public virtual ThumbnailedImage BannerImage { get; set; }

        [MaxLength(1024)]
        public string Description { get; set; }

        public string LowercaseDescription { get; set; }

        public virtual IList<MerchantAccount> ShopOwners { get; set; }

        [Required]
        public int Floor { get; set; }

        [Required]
        public double Latitude { get; set; }

        [Required]
        public double Longitude { get; set; }

        [Required]
        public double MinPrice { get; set; } = 0;

        [Required]
        public double MaxPrice { get; set; } = double.MaxValue;

        public virtual ShopCategory Category { get; set; }

        public virtual IList<ShopSubcategory> Subcategories { get; set; } = new List<ShopSubcategory>();

        public virtual IList<OnlineShopInstance> OnlineShopInstances { get; set; } = new List<OnlineShopInstance>();

        public virtual IList<Product> Products { get; set; } = new List<Product>();

        public virtual IList<WhatsappShopContact> WhatsappContacts { get; set; } = new List<WhatsappShopContact>();
    }
}