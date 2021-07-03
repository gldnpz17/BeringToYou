using DomainModel.Services;
using OtpNet;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DomainModelServiceImplementations.TotpService
{
    public class TotpService : ITotpService
    {
        public string GetBase32EncodedSecret()
        {
            var key = KeyGeneration.GenerateRandomKey(20);

            return Base32Encoding.ToString(key);
        }

        public bool Verify(string totp, string secret)
        {
            var totpVerifier = new Totp(Base32Encoding.ToBytes(secret));
            
            return totpVerifier.VerifyTotp(totp, out _);
        }
    }
}
