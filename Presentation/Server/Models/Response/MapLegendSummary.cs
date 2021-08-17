using System;

namespace Server.Models.Response
{
    public class MapLegendSummary
    {
        public Guid Id { get; set; }
        public string IconFilename { get; set; }
        public string Label { get; set; }
    }
}