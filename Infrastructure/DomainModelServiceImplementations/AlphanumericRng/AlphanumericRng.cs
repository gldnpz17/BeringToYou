using DomainModel.Services;
using System;
using System.Linq;

namespace DomainModelServiceImplementations.AlphanumericRng
{
    public class AlphanumericRng : IAlphanumericRng
    {
        private const string _characterSet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        public string GenerateRandomString(int length, bool cryptographicallySecure = false, bool uppercase = false)
        {
            Random random = new Random();

            var generatedString = new string(Enumerable.Repeat(_characterSet, length)
                .Select(s => s[random.Next(s.Length)]).ToArray());

            if (uppercase)
            {
                return generatedString.ToUpper();
            }
            else
            {
                return generatedString;
            }
        }
    }
}