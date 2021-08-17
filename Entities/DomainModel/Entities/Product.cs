using DomainModel.ValueObjects;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace DomainModel.Entities
{
    public class Product
    {
        [Key]
        public virtual Guid Id { get; set; }

        public virtual Shop Shop { get; set; }

        [Required]
        public string Name { get; set; }

        [MaxLength(1024)]
        public string Description { get; set; }

        [Required]
        public int MinimumPrice { get; set; }

        [Required]
        public int MaximumPrice { get; set; }

        public virtual ProductCategory Category { get; set; }

        public virtual ThumbnailedImage MainImage { get; set; }

        public virtual IList<ThumbnailedImage> Images { get; set; } = new List<ThumbnailedImage>();
    }
}