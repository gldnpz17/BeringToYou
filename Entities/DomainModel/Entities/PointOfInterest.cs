using System;
using System.ComponentModel.DataAnnotations;

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