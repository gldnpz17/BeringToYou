using DomainModel.Common;
using DomainModel.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DomainModel.Entities
{
    public class AdminAccount : AccountBase
    {
        public AdminAccount(
            string username, 
            string email,
            string displayName, 
            AdminPermissionPreset defaultPermissionPreset) : base(username, displayName)
        {
            Permissions = defaultPermissionPreset;
            Email = email;
        }

        public AdminAccount() { }

        public virtual AdminPermissionPreset Permissions { get; set; }
    }
}
