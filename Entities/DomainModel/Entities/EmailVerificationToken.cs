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
    public class EmailVerificationToken
    {
        public EmailVerificationToken(
            IAlphanumericRng alphanumericRng,
            IDateTimeService dateTimeService,
            IEmailSender emailSender,
            DomainModelConfiguration configuration)
        {
            Token = alphanumericRng.GenerateRandomString(configuration.EmailVerificationTokenLength, cryptographicallySecure: true);

            var now = dateTimeService.GetCurrentDateTime();
            Expired = now + configuration.EmailVerificationTokenDuration;

            SendEmail(emailSender);
        }

        public EmailVerificationToken() { }

        public virtual Guid AccountId { get; set; }
        public virtual AccountBase Account { get; set; }
        
        [Required]
        [Key]
        public string Token { get; set; }
        
        [Required]
        public DateTime Expired { get; set; }

        public void SendEmail(IEmailSender emailSender)
        {
            emailSender.SendEmail(new Email()
            {
                Subject = "Verifikasi E-mail - beringharjo.digital",
                Recipient = Account.Email,
                EmailBodyType = EmailBodyType.HTML,
                Body = $"Token verifikasi e-mail anda : {Token}"
            });
        }

        public void Verify(string token, IDateTimeService dateTimeService)
        {
            if (token == Token)
            {
                var now = dateTimeService.GetCurrentDateTime();

                if (now > Expired)
                {
                    throw new DomainModelException(
                        ExceptionCode.EMAIL_VERIFICATION_TOKEN_EXPIRED,
                        "The given email verification token has passed it's expiry date. Try generating a new one.");
                }

                Account.EmailVerified = true;
            }

            throw new DomainModelException(
                ExceptionCode.INCORRECT_EMAIL_VERIFICATION_TOKEN, 
                "The given e-mail verification code is incorrect.");
        }
    }
}
