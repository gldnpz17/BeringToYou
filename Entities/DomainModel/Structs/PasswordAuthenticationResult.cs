using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DomainModel.Structs
{
    public struct PasswordAuthenticationResult
    {
        public string Token { get; set; }
        public bool NeedsTwoFactor { get; set; }
    }
}
