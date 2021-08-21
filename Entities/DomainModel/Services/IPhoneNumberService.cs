using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DomainModel.Services
{
    public interface IPhoneNumberService
    {
        bool PhoneNumberIsValid(string phoneNumber);
        string GetInternationalPhoneNumber(string phoneNumber);
    }
}
