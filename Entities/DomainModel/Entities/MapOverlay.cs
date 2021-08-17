using System;
using System.ComponentModel.DataAnnotations;

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