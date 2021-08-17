using System;
using System.Collections.Generic;

namespace Server.Models.Response
{
    public class ProductDetailed
    {
        public Guid Id { get; set; }
        public ShopSummary Shop { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int MinimumPrice { get; set; }
        public int MaximumPrice { get; set; }
        public ProductCategorySummary Category { get; set; }
        public ThumbnailedImageSummary MainImage { get; set; }
        public List<ThumbnailedImageSummary> Images { get; set; }
    }
}