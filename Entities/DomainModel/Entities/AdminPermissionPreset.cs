using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DomainModel.Entities
{
    public class AdminPermissionPreset
    {
        [Key]
        public string Name { get; set; }
        
        [Required]
        public bool CanManageAccounts { get; set; } = false;

        [Required]
        public bool CanManagePermissions { get; set; } = false;

        [Required]
        public bool CanManageMap { get; set; } = false;
        
        [Required]
        public bool CanManageShops { get; set; } = false;

        [Required]
        public bool CanManageBackups { get; set; } = false;
    }
}
