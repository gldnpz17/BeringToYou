using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DomainModel.Entities
{
    public class PointOfInterest
    {
        public virtual Guid Id { get; set; }
        public virtual PointOfInterestCategory Category { get; set; }
        public virtual int FloorNumber { get; set; }
        public virtual double Latitude { get; set; }
        public virtual double Longitude { get; set; }
    }
}
