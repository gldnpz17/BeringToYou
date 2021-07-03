using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DomainModel.Services
{
    public class Email
    {
        public string Recipient { get; set; }
        public string Subject { get; set; }
        public string Body { get; set; }
        public EmailBodyType EmailBodyType { get; set; }
    }
}
