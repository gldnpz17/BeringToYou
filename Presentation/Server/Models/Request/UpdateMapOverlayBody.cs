using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Server.Models.Request
{
    public class UpdateMapOverlayBody
    {
        public int FloorNumber { get; set; }
        public int ZIndex { get; set; }
        public string Name { get; set; }
    }
}
