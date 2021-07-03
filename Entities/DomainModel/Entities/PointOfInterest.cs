using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DomainModel.Entities
{
    public class PointOfInterest
    {
        [Key]
        public virtual Guid Id { get; set; }
        
        public virtual PointOfInterestCategory Category { get; set; }
        
        [Required]
        public virtual int FloorNumber { get; set; }
        
        [Required]
        public virtual double Latitude { get; set; }
        
        [Required]
        public virtual double Longitude { get; set; }
    }
}
