using System;
using System.Collections.Generic;

namespace Server.Models.Response
{
    public class ShopCategorySummary
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string IconFilename { get; set; }
        public IList<ShopSubcategorySummary> Subcategories { get; set; }
    }
}