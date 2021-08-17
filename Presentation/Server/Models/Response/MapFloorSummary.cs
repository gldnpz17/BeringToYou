using System;

namespace Server.Models.Response
{
    public class MapFloorSummary
    {
        public Guid Id { get; set; }
        public int FloorNumber { get; set; }
        public string KmlFilename { get; set; }
    }
}