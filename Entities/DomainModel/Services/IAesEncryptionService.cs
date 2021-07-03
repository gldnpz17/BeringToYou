using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DomainModel.Services
{
    public interface IAesEncryptionService
    {
        (string base64Encrypted, string base64InitializationVector) Encrypt(string raw, string base64Key);
        string Decrypt(string base64Encrypted, string base64InitializationVector, string base64Key);
    }
}
