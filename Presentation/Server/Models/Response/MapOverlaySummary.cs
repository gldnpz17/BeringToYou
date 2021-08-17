using System;

namespace Server.Models.Response
{
    public class MapOverlaySummary
    {
        public Guid Id { get; set; }
        public int FloorNumber { get; set; }
        public int ZIndex { get; set; }
        public string Name { get; set; }
        public string IconFilename { get; set; }
    }
}