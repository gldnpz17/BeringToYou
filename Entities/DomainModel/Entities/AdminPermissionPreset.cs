using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DomainModel.Entities
{
    public class AdminPermissionPreset
    {
        public string Name { get; set; }
        public bool CanManageAccounts { get; set; } = false;
        public bool CanManagePermissions { get; set; } = false;
        public bool CanManageMap { get; set; } = false;
        public bool CanManageShops { get; set; } = false;
        public bool CanManageBackups { get; set; } = false;
    }
}
