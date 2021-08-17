using System;
using System.ComponentModel.DataAnnotations;

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