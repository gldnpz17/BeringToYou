using DomainModel.Common;
using DomainModel.Services;
using System;
using System.ComponentModel.DataAnnotations;

namespace DomainModel.Entities
{
    public class TotpCredential
    {
        public TotpCredential(
            ITotpService secretGenerator,
            IAesEncryptionService encryptionService,
            DomainModelConfiguration configuration)
        {
            GenerateSharedSecret(secretGenerator, encryptionService, configuration);
        }

        public TotpCredential()
        {
        }

        [Key]
        public virtual Guid AccountId { get; set; }

        public virtual AccountBase Account { get; set; }

        public string AesEncryptedSharedSecret { get; set; }

        public string Base32EncodedInitializationVector { get; set; }

        public DateTime VerificationTimeoutEnd { get; set; }

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