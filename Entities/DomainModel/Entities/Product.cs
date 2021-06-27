using DomainModel.ValueObjects;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DomainModel.Entities
{
    public class Product
    {
        public virtual Guid Id { get; set; }
        public virtual Shop Shop { get; set; }
        public virtual string Name { get; set; }
        public virtual string Description { get; set; }
        public virtual int MinimumPrice { get; set; }
        public virtual int MaximumPrice { get; set; }
        public virtual ProductCategory Category { get; set; }
        public virtual ThumbnailedImage MainImage { get; set; }
        public virtual IList<ThumbnailedImage> Images { get; set; } = new List<ThumbnailedImage>();
    }
}
