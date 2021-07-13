using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DomainModel.Entities
{
    public class ProductCategory
    {
        [Key]
        public virtual Guid Id { get; set; }
        
        [Required]
        public virtual string Name { get; set; }
        
        public virtual string ThumbnailFilename { get; set; }
    }
}
