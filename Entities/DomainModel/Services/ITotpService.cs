using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DomainModel.Services
{
    public interface ITotpService
    {
        string GetBase32EncodedSecret();
        bool Verify(string totp, string secret);
    }
}
