using System;
using System.Collections.Generic;

namespace Server.Models.Response
{
    public class ShopSummary
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public ThumbnailedImageSummary BannerImage { get; set; }
        public int Floor { get; set; }
        public double Latitude { get; set; }
        public double Longitude { get; set; }
        public string ShopCategoryName { get; set; }
        public IList<ShopSubcategorySummary> Subcategories { get; set; }
        public ShopCategorySummary Category { get; set; }
    }
}