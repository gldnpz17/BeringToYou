﻿using DomainModel.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

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
