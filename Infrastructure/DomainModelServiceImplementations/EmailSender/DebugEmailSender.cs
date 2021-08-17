using DomainModel.Services;
using System.Diagnostics;

namespace DomainModelServiceImplementations.EmailSender
{
    public class DebugEmailSender : IEmailSender
    {
        public void SendEmail(Email email)
        {
            Debug.WriteLine($"Email sent! Recipient:{email.Recipient}; Subject:{email.Subject}; BodyType:{email.EmailBodyType}; Body:{email.Body}");
        }
    }
}