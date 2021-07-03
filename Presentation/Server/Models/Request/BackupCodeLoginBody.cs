using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Server.Models.Request
{
    public class BackupCodeLoginBody
    {
        public string Email { get; set; }
        public string TwoFactorToken { get; set; }
        public string BackupCode { get; set; }
    }
}
