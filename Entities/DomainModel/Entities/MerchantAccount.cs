using DomainModel.Common;
using DomainModel.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DomainModel.Entities
{
    public class MerchantAccount : AccountBase
    {
        public MerchantAccount(
            string username,
            string displayName,
            IDateTimeService dateTimeService,
            DomainModelConfiguration domainModelConfiguration) : base(username, displayName)
        {
            var now = dateTimeService.GetCurrentDateTime();

            VerificationRequest = new MerchantVerificationRequest()
            {
                MerchantAccount = this,
                Expired = now + domainModelConfiguration.MerchantSignUpRequestLifespan
            };
        }

        public MerchantAccount() { }

        public virtual IList<Shop> OwnedShops { get; set; }
        
        public virtual MerchantVerificationRequest VerificationRequest { get; set; }
    }
}
