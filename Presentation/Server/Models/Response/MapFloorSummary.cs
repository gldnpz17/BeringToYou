using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Server.Models.Response
{
    public class MapFloorSummary
    {
        public Guid Id { get; set; }
        public int FloorNumber { get; set; }
        public string KmlFilename { get; set; }
    }
}
