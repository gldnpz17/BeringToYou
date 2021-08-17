using System;

namespace DomainModel.Common
{
    public class DomainModelException : Exception
    {
        public ExceptionCode Code { get; }

        public DomainModelException(ExceptionCode code, string message) : base(message)
        {
            Code = code;
        }
    }
}