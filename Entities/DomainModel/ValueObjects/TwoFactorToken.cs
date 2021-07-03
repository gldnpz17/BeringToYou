using DomainModel.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DomainModel.ValueObjects
{
    public class TwoFactorToken : ValueObject
    {
        public string Token { get; set; }
        public DateTime Expiry { get; set; }

        protected override IEnumerable<object> GetAtomicValues()
        {
            yield return Token;
            yield return Expiry;
        }
    }
}
