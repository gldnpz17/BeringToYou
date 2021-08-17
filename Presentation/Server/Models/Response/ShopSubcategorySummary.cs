using System;

namespace Server.Models.Response
{
    public class ShopSubcategorySummary
    {
        public Guid Id { get; set; }
        public virtual Guid CategoryId { get; set; }
        public string Name { get; set; }
        public string RgbHexLegendColor { get; set; }
    }
}