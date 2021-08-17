using System;

namespace Server.Models.Request
{
    public class UpdatePointOfInterestBody
    {
        public Guid CategoryId { get; set; }
        public int FloorNumber { get; set; }
        public double Latitude { get; set; }
        public double Longitude { get; set; }
    }
}