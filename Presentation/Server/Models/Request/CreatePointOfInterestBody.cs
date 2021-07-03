﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Server.Models.Request
{
    public class CreatePointOfInterestBody
    {
        public Guid CategoryId { get; set; }
        public int FloorNumber { get; set; }
        public double Latitude { get; set; }
        public double Longitude { get; set; }
    }
}
