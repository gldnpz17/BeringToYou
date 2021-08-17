using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace DomainModel.Entities
{
    public class ShopCategory
    {
        [Key]
        public Guid Id { get; set; }

        [Required]
        public string Name { get; set; }

        public string IconFilename { get; set; }

        public virtual IList<ShopSubcategory> Subcategories { get; set; } = new List<ShopSubcategory>();
    }
}