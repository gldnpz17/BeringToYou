using DomainModel.Services;
using System;
using System.IO;
using System.Security.Cryptography;
using System.Text;

namespace DomainModelServiceImplementations.AesEncryptionService
{
    public class AesEncryptionService : IAesEncryptionService
    {
        public string Decrypt(string base64Encrypted, string base64InitializationVector, string base64Key)
        {
            using (var memoryStream = new MemoryStream(Convert.FromBase64String(base64Encrypted)))
            {
                using (var aes = Aes.Create())
                {
                    aes.Padding = PaddingMode.ISO10126;

                    aes.Key = Convert.FromBase64String(base64Key);

                    aes.IV = Convert.FromBase64String(base64InitializationVector);

                    using (var cryptoStream = new CryptoStream(memoryStream, aes.CreateDecryptor(), CryptoStreamMode.Read))
                    {
                        using (var decryptReader = new StreamReader(cryptoStream, Encoding.UTF8))
                        {
                            string decrypted = decryptReader.ReadToEnd();

                            return decrypted;
                        }
                    }
                }
            }
        }

        public (string base64Encrypted, string base64InitializationVector) Encrypt(string raw, string base64Key)
        {
            var rawBytes = Encoding.UTF8.GetBytes(raw);

            using (var memoryStream = new MemoryStream(rawBytes.Length))
            {
                using (var aes = Aes.Create())
                {
                    aes.Padding = PaddingMode.ISO10126;

                    aes.Key = Convert.FromBase64String(base64Key);

                    var initializationVector = aes.IV;
                    var encryptedString = "";

                    using (var cryptoStream = new CryptoStream(memoryStream, aes.CreateEncryptor(), CryptoStreamMode.Write))
                    {
                        var encryptWriter = new StreamWriter(cryptoStream);
                        using (encryptWriter)
                        {
                            encryptWriter.Write(raw);
                        }

                        encryptedString = Convert.ToBase64String(memoryStream.ToArray());
                    }

                    return (encryptedString, Convert.ToBase64String(initializationVector));
                }
            }
        }
    }
}