using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Server.Models.Request
{
    public class ResetPasswordBody
    {
        public Guid AccountId { get; set; }
        public string NewPassword { get; set; }
    }
}
