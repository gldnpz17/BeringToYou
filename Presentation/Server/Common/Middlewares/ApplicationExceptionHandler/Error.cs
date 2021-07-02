using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Server.Common.Middlewares.ApplicationExceptionHandler
{
    public class Error
    {
        public string ErrorCode { get; set; }
        public string Message { get; set; }
    }
}
