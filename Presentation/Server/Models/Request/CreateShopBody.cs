using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Server.Models.Request
{
    public class CreateShopBody
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public int Floor { get; set; }
        public double Latitude { get; set; }
        public double Longitude { get; set; }
        public string CategoryName { get; set; }
    }
}
