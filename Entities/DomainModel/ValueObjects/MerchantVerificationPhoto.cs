using DomainModel.Common;
using System.Collections.Generic;

namespace DomainModel.ValueObjects
{
    public class MerchantVerificationPhoto : ValueObject
    {
        public virtual string Filename { get; set; }

        protected override IEnumerable<object> GetAtomicValues()
        {
            yield return Filename;
        }
    }
}