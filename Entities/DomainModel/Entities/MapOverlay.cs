using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DomainModel.Entities
{
    public class MapOverlay : MapLayer
    {
        [Key]
        public Guid Id { get; set; }

        [Required]
        public int FloorNumber { get; set; }

        [Required]
        public int ZIndex { get; set; }
        
        [Required]
        public string Name { get; set; }
        
        public string IconFilename { get; set; }
    }
}
