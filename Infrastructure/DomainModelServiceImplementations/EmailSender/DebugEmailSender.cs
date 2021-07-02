using DomainModel.Services;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

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
