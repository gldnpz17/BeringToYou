using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DomainModel.Entities
{
    public class MapOverlay : MapLayer
    {
        public virtual Guid Id { get; set; }
        public virtual int FloorNumber { get; set; }
        public virtual int ZIndex { get; set; }
        public virtual string Name { get; set; }
        public virtual string IconFilename { get; set; }
    }
}
