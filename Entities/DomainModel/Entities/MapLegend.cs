using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DomainModel.Entities
{
    public class MapLegend
    {
        public Guid Id { get; set; }

        public string IconFilename { get; set; }
        
        [Required]
        public string Label { get; set; }
    }
}
