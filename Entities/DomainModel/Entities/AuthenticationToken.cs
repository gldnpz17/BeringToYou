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
    public class AuthenticationToken
    {
        public AuthenticationToken(string token, IDateTimeService dateTimeService, DomainModelConfiguration domainModelConfiguration)
        {
            Token = token;

            Expired = dateTimeService.GetCurrentDateTime() + domainModelConfiguration.AuthenticationTokenMaxUnusedDuration;
        }

        public AuthenticationToken() { }

        [Key]
        public virtual Guid AccountId { get; set; }
        public virtual AccountBase Account { get; set; }

        [Required]
        public string Token { get; set; }
        
        [Required]
        public DateTime Expired { get; set; }

        public bool Verify(IDateTimeService dateTimeService, DomainModelConfiguration domainModelConfiguration)
        {
            var now = dateTimeService.GetCurrentDateTime();

            if (now > Expired)
            {
                throw new DomainModelException(ExceptionCode.AUTHENTICATION_CODE_EXPIRED, "The authentication token has expired");
            }

            Expired = dateTimeService.GetCurrentDateTime() + domainModelConfiguration.AuthenticationTokenMaxUnusedDuration;

            return true;
        }

        public void ExtendLifetime(
            IDateTimeService dateTimeService,
            DomainModelConfiguration configuration)
        {
            var now = dateTimeService.GetCurrentDateTime();

            Expired = now + configuration.AuthenticationTokenMaxUnusedDuration;
        }
    }
}
