using Microsoft.AspNetCore.Builder;

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