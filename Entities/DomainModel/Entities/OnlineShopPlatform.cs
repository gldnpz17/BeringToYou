using System;
using System.ComponentModel.DataAnnotations;

namespace DomainModel.Entities
{
    public class OnlineShopPlatform
    {
        [Key]
        public Guid Id { get; set; }

        [Required]
        public string Name { get; set; }

        public string IconFilename { get; set; }
    }
}