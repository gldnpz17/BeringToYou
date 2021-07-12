using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DomainModel.Entities
{
    public class OnlineShopInstance
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public virtual Guid Id { get; set; }
        
        public virtual Shop Shop { get; set; }
        
        public virtual OnlineShopPlatform Platform { get; set; }
        
        [Required]
        public virtual string Name { get; set; }
        
        public virtual string Url { get; set; }
    }
}
