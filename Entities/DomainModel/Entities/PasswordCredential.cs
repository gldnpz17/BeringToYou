using DomainModel.Common;
using DomainModel.Services;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DomainModel.Entities
{
    public class PasswordCredential
    {
        public PasswordCredential( 
            string password, 
            IPasswordHasher passwordHasher,
            IAlphanumericRng alphanumericRng,
            DomainModelConfiguration configuration)
        {
            Salt = alphanumericRng.GenerateRandomString(
                configuration.PasswordSaltLength,
                cryptographicallySecure: true);

            Hash = passwordHasher.Hash(password, Salt);
        }

        public PasswordCredential() { }

        [Key]
        public virtual Guid AccountId { get; set; }
        public virtual AccountBase Account { get; set; }

        public string Hash { get; set; }
        
        public string Salt { get; set; }

        public DateTime PasswordAttemptMistakeClear { get; set; }
        
        public int PasswordAttemptMistakeCounter { get; set; }
        
        public DateTime PasswordAttemptTimeoutExpired { get; set; }

        public string ResetToken { get; set; }
        
        public DateTime ResetTokenExpired { get; set; }

        public DateTime ResetAttemptMistakeClear { get; set; }
        
        public int ResetAttemptMistakeCounter { get; set; }
        
        public DateTime ResetAttemptTimeoutExpired { get; set; }

        public bool VerifyPassword(
            string password,
            IDateTimeService dateTimeService,
            IPasswordHasher passwordHasher,
            DomainModelConfiguration configuration)
        {
            var now = dateTimeService.GetCurrentDateTime();

            if (now >= PasswordAttemptTimeoutExpired)
            {
                if (PasswordIsCorrect())
                {
                    return true;
                }
                else
                {
                    if (now >= PasswordAttemptMistakeClear)
                    {
                        PasswordAttemptMistakeCounter = 0;
                        PasswordAttemptMistakeClear = now + configuration.TimeBeforePasswordRetryClear;
                    }

                    PasswordAttemptMistakeCounter++;

                    if (PasswordAttemptMistakeCounter >= configuration.PasswordMaxRetries)
                    {
                        PasswordAttemptTimeoutExpired = now + configuration.PasswordAttemptTimeoutDuration;
                    }

                    return false;
                }
            }
            else
            {
                throw new DomainModelException(
                    ExceptionCode.PASSWORD_ATTEMPT_TIMEOUT,
                    "Too many attempts has been made. Please try again later.");
            }

            bool PasswordIsCorrect()
            {
                var hash = passwordHasher.Hash(password, Salt);

                return (hash == Hash);
            }
        }

        public void SendPasswordResetToken(
            IEmailSender emailSender,
            IAlphanumericRng alphanumericRng,
            IDateTimeService dateTimeService,
            DomainModelConfiguration configuration)
        {
            var now = dateTimeService.GetCurrentDateTime();

            ResetToken = alphanumericRng.GenerateRandomString(
                configuration.PasswordResetTokenLength,
                cryptographicallySecure: true);

            ResetTokenExpired = now + configuration.PasswordResetTokenValidDuration;

            emailSender.SendEmail(new Email()
            {
                Recipient = Account.Email,
                Subject = "Reset Kata Sandi untuk Akun beringharjo.digital",
                EmailBodyType = EmailBodyType.HTML,
                Body = $"Kode Reset : {ResetToken}"
            });
        }

        public void ResetPassword(
            string token, 
            string newPassword, 
            IPasswordHasher passwordHasher,
            IDateTimeService dateTimeService,
            DomainModelConfiguration configuration)
        {
            var now = dateTimeService.GetCurrentDateTime();

            if (now >= ResetAttemptTimeoutExpired)
            {
                if (token == ResetToken)
                {
                    if (now > ResetTokenExpired)
                    {
                        throw new DomainModelException(
                            ExceptionCode.PASSWORD_RESET_TOKEN_EXPIRED,
                            "This password reset token has passed it's expiry time.");
                    }

                    SetNewPassword();
                    Account.AuthenticationTokens.Clear();
                }
                else
                {
                    if (now >= ResetAttemptMistakeClear)
                    {
                        ResetAttemptMistakeCounter = 0;
                        ResetAttemptMistakeClear = now + configuration.TimeBeforePasswordResetRetryClear;
                    }

                    ResetAttemptMistakeCounter++;

                    if (ResetAttemptMistakeCounter >= configuration.PasswordResetMaxRetries)
                    {
                        ResetAttemptTimeoutExpired = now + configuration.PasswordAttemptTimeoutDuration;
                    }
                }
            }
            else
            {
                throw new DomainModelException(
                    ExceptionCode.PASSWORD_RESET_ATTEMPT_TIMEOUT,
                    "Too many password reset attempt has been made. Please try again later.");
            }

            void SetNewPassword()
            {
                var hash = passwordHasher.Hash(newPassword, Salt);

                Hash = hash;
            }
        }
    }
}
