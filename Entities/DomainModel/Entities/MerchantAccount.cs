﻿using DomainModel.Common;
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
            string email,
            string displayName,
            string password,
            IPasswordHasher passwordHasher,
            IAlphanumericRng alphanumericRng,
            IDateTimeService dateTimeService,
            DomainModelConfiguration domainModelConfiguration) : base(email, displayName, password, passwordHasher, alphanumericRng, domainModelConfiguration)
        {
            var now = dateTimeService.GetCurrentDateTime();

            VerificationRequest = new MerchantVerificationRequest()
            {
                Account = this,
                Expired = now + domainModelConfiguration.MerchantSignUpRequestLifespan
            };
        }

        public virtual IList<Shop> OwnedShops { get; set; }
        
        public virtual MerchantVerificationRequest VerificationRequest { get; set; }
    }
}