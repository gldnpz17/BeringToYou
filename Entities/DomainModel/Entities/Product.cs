using DomainModel.ValueObjects;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DomainModel.Entities
{
    public class Product
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public virtual Guid Id { get; set; }
        
        public virtual Shop Shop { get; set; }

        [Required]
        public virtual string Name { get; set; }

        [MaxLength(1024)]
        public virtual string Description { get; set; }
        
        [Required]
        public virtual int MinimumPrice { get; set; }
        
        [Required]
        public virtual int MaximumPrice { get; set; }
        
        public virtual ProductCategory Category { get; set; }
        
        public virtual ThumbnailedImage MainImage { get; set; }
        
        public virtual IList<ThumbnailedImage> Images { get; set; } = new List<ThumbnailedImage>();
    }
}
