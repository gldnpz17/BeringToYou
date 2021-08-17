﻿using System;
using System.Collections.Generic;

namespace Server.Models.Request
{
    public class UpdateShopBody
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public int Floor { get; set; }
        public double Latitude { get; set; }
        public double Longitude { get; set; }
        public Guid CategoryId { get; set; }
        public IList<Guid> SubcategoryIds { get; set; }
        public double MinPrice { get; set; }
        public double MaxPrice { get; set; }
    }
}