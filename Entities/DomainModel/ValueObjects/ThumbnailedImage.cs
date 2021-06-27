using DomainModel.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DomainModel.ValueObjects
{
    public class ThumbnailedImage : ValueObject
    {
        public virtual string Filename { get; set; }
        public virtual string ThumbnailFilename { get; set; }

        protected override IEnumerable<object> GetAtomicValues()
        {
            throw new NotImplementedException();
        }
    }
}
