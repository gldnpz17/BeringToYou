using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

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
