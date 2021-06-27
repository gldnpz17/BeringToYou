using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Server.Models.Response
{
    public class ProductSummary
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public int MinimumPrice { get; set; }
        public int MaximumPrice { get; set; }
        public string CategoryName { get; set; }
        public string MainImageThumbnailFilename { get; set; }
    }
}
