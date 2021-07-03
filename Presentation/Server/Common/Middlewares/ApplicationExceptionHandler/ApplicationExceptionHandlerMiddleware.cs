using DomainModel.Common;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using Server.Common.Exceptions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace Server.Common.Middlewares.ApplicationExceptionHandler
{
    public class ApplicationExceptionHandlerMiddleware
    {
        private readonly RequestDelegate _next;

        public ApplicationExceptionHandlerMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            try
            {
                await _next(context);
            }
            catch (DomainModelException exception)
            {
                await WriteErrorAsync(new Error()
                {
                    ErrorCode = exception.Code.ToString(),
                    Message = exception.Message
                });
            }
            catch (AppException exception)
            {
                await WriteErrorAsync(new Error()
                {
                    ErrorCode = exception.ExceptionCode.ToString(),
                    Message = exception.Message
                });
            }

            async Task WriteErrorAsync(Error error)
            {
                context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;

                var errorJson = JsonConvert.SerializeObject(error);

                await context.Response.WriteAsync(errorJson, Encoding.UTF8);
            }
        }
    }
}
