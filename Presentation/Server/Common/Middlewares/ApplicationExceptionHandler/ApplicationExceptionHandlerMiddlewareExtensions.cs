using Microsoft.AspNetCore.Builder;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Server.Common.Middlewares.ApplicationExceptionHandler
{
    public static class ApplicationExceptionHandlerMiddlewareExtensions
    {
        public static IApplicationBuilder UseApplicationExceptionHandler(this IApplicationBuilder builder)
        {
            return builder.UseMiddleware<ApplicationExceptionHandlerMiddleware>();
        }
    }
}
