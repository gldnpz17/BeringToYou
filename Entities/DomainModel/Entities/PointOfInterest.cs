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
        public Guid Id { get; set; }
        
        public virtual PointOfInterestCategory Category { get; set; }
        
        [Required]
        public int FloorNumber { get; set; }
        
        [Required]
        public double Latitude { get; set; }
        
        [Required]
        public double Longitude { get; set; }
    }
}
