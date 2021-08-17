using System;

namespace Server.Common.Exceptions
{
    public class AppException : Exception
    {
        public AppExceptionCode ExceptionCode { get; private set; }

        public AppException(AppExceptionCode exceptionCode, string message = "") : base(message)
        {
            ExceptionCode = exceptionCode;
        }
    }
}