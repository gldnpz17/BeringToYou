using DomainModel.Services;
using PhoneNumbers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DomainModelServiceImplementations.PhoneNumberService
{
    public class LibPhoneNumberService : IPhoneNumberService
    {
        private readonly PhoneNumberUtil _util = PhoneNumberUtil.GetInstance();

        private readonly string _defaultCountry;

        public LibPhoneNumberService(string defaultCountry)
        {
            _defaultCountry = defaultCountry;
        }

        public string GetInternationalPhoneNumber(string phoneNumber)
        {
            var number = _util.Parse(phoneNumber, _defaultCountry);

            return _util.Format(number, PhoneNumberFormat.INTERNATIONAL);
        }

        public bool PhoneNumberIsValid(string phoneNumber)
        {
            var number = _util.Parse(phoneNumber, _defaultCountry);

            return _util.IsValidNumber(number);
        }
    }
}
