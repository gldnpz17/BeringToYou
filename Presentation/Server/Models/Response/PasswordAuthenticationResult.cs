﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Server.Models.Response
{
    public class PasswordAuthenticationResult
    {
        public string Token { get; set; }
        public bool NeedsTwoFactor { get; set; }
    }
}
