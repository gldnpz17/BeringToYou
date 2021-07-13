using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DomainModel.Entities
{
    public class MapFloor : MapLayer
    {
        [Key]
        public int FloorNumber { get; set; }
    }
}
