using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace DomainModel.Entities
{
    public class ShopContact
    {
        public Guid Id { get; set; }

        public virtual Shop Shop { get; set; }

        public string ContactIdentity { get; set; }

        public string ContactUrl { get; set; }
    }
}
