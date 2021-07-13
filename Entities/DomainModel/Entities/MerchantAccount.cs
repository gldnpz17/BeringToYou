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
            string password,
            IDateTimeService dateTimeService,
            IPasswordHasher passwordHasher,
            IAlphanumericRng alphanumericRng,
            DomainModelConfiguration domainModelConfiguration) : base(username, displayName, password, passwordHasher, alphanumericRng, domainModelConfiguration)
        {
            var now = dateTimeService.GetCurrentDateTime();

            VerificationRequest = new MerchantVerificationRequest()
            {
                Expired = now + domainModelConfiguration.MerchantSignUpRequestLifespan
            };
        }

        public MerchantAccount() { }

        public virtual IList<Shop> OwnedShops { get; set; } = new List<Shop>();
        
        public virtual MerchantVerificationRequest VerificationRequest { get; set; }
    }
}
