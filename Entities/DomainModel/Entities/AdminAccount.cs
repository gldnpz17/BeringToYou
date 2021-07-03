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
            string email, 
            string displayName, 
            string password, 
            AdminPermissionPreset defaultPermissionPreset,
            IPasswordHasher passwordHasher, 
            IAlphanumericRng alphanumericRng, 
            DomainModelConfiguration domainModelConfiguration) : base(email, displayName, password, passwordHasher, alphanumericRng, domainModelConfiguration)
        {
            Permissions = defaultPermissionPreset;
        }

        public virtual AdminPermissionPreset Permissions { get; set; }
    }
}
