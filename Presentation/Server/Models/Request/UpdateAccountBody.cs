using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Server.Models.Request
{
    public class UpdateAccountBody
    {
        public string Email { get; set; }
        public string DisplayName { get; set; }
    }
}
