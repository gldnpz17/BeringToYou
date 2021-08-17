using System;

namespace Server.Models.Response
{
    public class ProductCategorySummary
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string ThumbnailFilename { get; set; }
    }
}