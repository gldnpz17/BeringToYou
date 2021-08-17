using System;

namespace Server.Models.Response
{
    public class PointOfInterestCategorySummary
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string IconFilename { get; set; }
    }
}