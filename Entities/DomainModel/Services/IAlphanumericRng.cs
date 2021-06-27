using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DomainModel.Services
{
    public interface IAlphanumericRng
    {
        string GenerateRandomString(int length, bool cryptographicallySecure = false, bool uppercase = false);
    }
}
