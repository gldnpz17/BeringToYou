using System;
using System.ComponentModel.DataAnnotations;

namespace DomainModel.Entities
{
    public class OnlineShopInstance
    {
        [Key]
        public Guid Id { get; set; }

        public virtual Shop Shop { get; set; }

        public virtual OnlineShopPlatform Platform { get; set; }

        [Required]
        public string Name { get; set; }

        public string Url { get; set; }
    }
}