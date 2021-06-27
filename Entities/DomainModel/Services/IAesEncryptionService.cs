using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DomainModel.Services
{
    public interface IAesEncryptionService
    {
        (string encrypted, string base32EncodedInitializationVector) Encrypt(string raw, string key);
        string Decrypt(string encrypted, string initializationVector, string key);
    }
}
