using DomainModel.Common;
using DomainModel.ValueObjects;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace DomainModel.Entities
{
    public class MerchantVerificationRequest
    {
        [Key]
        public virtual Guid AccountId { get; set; }

        public virtual MerchantAccount Account { get; set; }

        public bool Accepted { get; set; } = false;

        public DateTime Expired { get; set; }

        public virtual IList<Shop> OwnedShops { get; set; } = new List<Shop>();

        public virtual IList<MerchantVerificationPhoto> VerificationPhotos { get; set; } = new List<MerchantVerificationPhoto>();

        public void AcceptVerification()
        {
            if (Accepted == false)
            {
                Accepted = true;
                Account.OwnedShops = OwnedShops;
            }
            else
            {
                throw new DomainModelException(ExceptionCode.MERCHANT_ALREADY_VERIFIED, "Merchant has already been verified");
            }
        }
    }
}