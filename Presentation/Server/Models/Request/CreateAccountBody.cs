﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Server.Models.Request
{
    public class CreateAccountBody
    {
        public virtual string Email { get; set; }
        public virtual string DisplayName { get; set; }
        public virtual string Password { get; set; }
    }
}
