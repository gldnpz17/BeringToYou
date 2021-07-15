using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Server.Models.Response
{
    public class ShopDetailed
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public ThumbnailedImageSummary HeroImage { get; set; }
        public string Description { get; set; }
        public int Floor { get; set; }
        public double Latitude { get; set; }
        public double Longitude { get; set; }
        public ShopCategorySummary Category { get; set; }
        public IList<OnlineShopInstanceSummary> OnlineShopInstances { get; set; }
        public IList<ProductSummary> Products { get; set; }
    }
}
