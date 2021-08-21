using System;
using System.Collections.Generic;

namespace Server.Models.Response
{
    public class ShopDetailed
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public ThumbnailedImageSummary BannerImage { get; set; }
        public List<string> OwnerNames { get; set; }
        public string Description { get; set; }
        public int Floor { get; set; }
        public double Latitude { get; set; }
        public double Longitude { get; set; }
        public ShopCategorySummary Category { get; set; }
        public IList<ShopSubcategorySummary> Subcategories { get; set; }
        public IList<OnlineShopInstanceSummary> OnlineShopInstances { get; set; }
        public IList<ProductSummary> Products { get; set; }
        public double MinPrice { get; set; }
        public double MaxPrice { get; set; }
        public List<AccountSummary> ShopOwners { get; set; }
        public List<ShopContactSummary> WhatsappContacts { get; set; }
    }
}