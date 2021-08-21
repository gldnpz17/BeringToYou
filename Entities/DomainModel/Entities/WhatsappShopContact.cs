using DomainModel.Common;
using DomainModel.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace DomainModel.Entities
{
    public class WhatsappShopContact : ShopContact
    {
        public void SetIdentity(string phoneNumber, IPhoneNumberService phoneNumberService)
        {
            if (phoneNumberService.PhoneNumberIsValid(phoneNumber))
            {
                var internationalNumber = phoneNumberService.GetInternationalPhoneNumber(phoneNumber);

                ContactIdentity = internationalNumber;

                var digitsOnly = Regex.Replace(internationalNumber, @"\D", "");
                var whatsappNumber = Regex.Replace(digitsOnly, "^0+", "");

                ContactUrl = $"https://wa.me/{whatsappNumber}";
            }
            else
            {
                throw new DomainModelException(ExceptionCode.INVALID_PHONE_NUMBER, "Cannot parse phone number.");
            }
        }
    }
}
