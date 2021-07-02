using DomainModel.Common;
using DomainModel.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DomainModel.Entities
{
    public class TotpCredential
    {
        public TotpCredential(
            ITotpService secretGenerator,
            IAesEncryptionService encryptionService,
            DomainModelConfiguration configuration,
            AccountBase account)
        {
            Account = account;
            GenerateSharedSecret(secretGenerator, encryptionService, configuration);
        }

        public virtual AccountBase Account { get; set; }

        public virtual string AesEncryptedSharedSecret { get; set; }
        
        public virtual string Base32EncodedInitializationVector { get; set; }
        
        public virtual DateTime VerificationTimeoutEnd { get; set; }

        public string RevealSharedSecret(
            IAesEncryptionService aesEncryptionService,
            DomainModelConfiguration configuration)
        {
            var secret = aesEncryptionService.Decrypt(
                AesEncryptedSharedSecret,
                Base32EncodedInitializationVector,
                configuration.TotpSecretEncryptionKey);

            return secret;
        }

        private string GenerateSharedSecret(
            ITotpService secretGenerator,
            IAesEncryptionService encryptionService,
            DomainModelConfiguration configuration)
        {
            var secret = secretGenerator.GetBase32EncodedSecret();

            var (encrypted, base32EncodedInitializationVector) = encryptionService.Encrypt(secret, configuration.TotpSecretEncryptionKey);

            AesEncryptedSharedSecret = encrypted;
            Base32EncodedInitializationVector = base32EncodedInitializationVector;

            return secret;
        }

        public bool Verify(
            string totp,
            IAesEncryptionService aesEncryptionService,
            ITotpService totpService,
            IDateTimeService dateTimeService,
            DomainModelConfiguration configuration)
        {
            var now = dateTimeService.GetCurrentDateTime();

            if (now > VerificationTimeoutEnd)
            {
                VerificationTimeoutEnd = now + configuration.TotpAttemptInterval;

                var secret = aesEncryptionService.Decrypt(
                    AesEncryptedSharedSecret,
                    Base32EncodedInitializationVector,
                    configuration.TotpSecretEncryptionKey);

                var result = totpService.Verify(totp, secret);

                return result;
            }
            else
            {
                throw new DomainModelException(
                    ExceptionCode.TOTP_ATTEMPT_TIMEOUT,
                    "Too many attempts has been made. Please try again later.");
            }
        }
    }
}
