using System;
using System.ComponentModel.DataAnnotations;

namespace DomainModel.Entities
{
    public class ShopSubcategory
    {
        public Guid Id { get; set; }

        public virtual ShopCategory ShopCategory { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public string RgbHexLegendColor { get; set; } = "#FFFFFF";
    }
}