using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

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
