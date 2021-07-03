using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Server.Models.Request
{
    public class CreateProductBody
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public int MinimumPrice { get; set; }
        public int MaximumPrice { get; set; }
        public string CategoryName { get; set; }
    }
}
