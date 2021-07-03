using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Server.Models.Request
{
    public class SignUpMerchantBody
    {
        public string Email { get; set; }
        public string DisplayName { get; set; }
        public virtual string Password { get; set; }
    }
}
