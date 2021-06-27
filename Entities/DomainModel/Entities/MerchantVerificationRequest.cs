using DomainModel.ValueObjects;
using System;
using System.Collections.Generic;

namespace DomainModel.Entities
{
    public class MerchantVerificationRequest
    {
        public virtual MerchantAccount Account { get; set; }
        public virtual bool Accepted { get; set; } = false;
        public virtual DateTime Expired { get; set; }
        public virtual IList<Shop> OwnedShops { get; set; }
        public virtual IList<MerchantVerificationPhoto> VerificationPhotos { get; set; } = new List<MerchantVerificationPhoto>();

        public void AcceptVerification()
        {
            Accepted = true;
            Account.OwnedShops = OwnedShops;
        }
    }
}
