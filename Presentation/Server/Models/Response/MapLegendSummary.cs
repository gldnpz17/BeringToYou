using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Server.Models.Response
{
    public class MapLegendSummary
    {
        public Guid Id { get; set; }
        public string IconFilename { get; set; }
        public string Label { get; set; }
    }
}
