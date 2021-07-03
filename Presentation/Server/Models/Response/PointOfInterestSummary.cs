using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Server.Models.Response
{
    public class PointOfInterestSummary
    {
        public Guid Id { get; set; }
        public PointOfInterestCategorySummary Category { get; set; }
        public int FloorNumber { get; set; }
        public double Latitude { get; set; }
        public double Longitude { get; set; }
    }
}
