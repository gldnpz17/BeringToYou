using DomainModel.Common;
using DomainModel.Services;
using EFCoreDatabase;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Server.Common;
using Server.Common.Auth;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Server.Controllers.Auth
{
    [Route("api/auth/email-verification")]
    [ApiController]
    public class EmailVerificationController : ApiControllerBase
    {
        private readonly IDateTimeService _dateTimeService;

        public EmailVerificationController(
            AppDbContext database,
            IAuthorizationService authorizationService,
            IDateTimeService dateTimeService) : base(database, authorizationService)
        {
            _dateTimeService = dateTimeService;
        }

        [HttpPost("send-email")]
        [Authorize(PolicyNameConstants.AuthenticatedUsers)]
        public async Task<IActionResult> SendEmailVerificationMail(
            [FromServices] IAlphanumericRng alphanumericRng,
            [FromServices] IEmailSender emailSender,
            [FromServices] DomainModelConfiguration domainModelConfiguration)
        {
            var account = await GetLoggedInAccount();

            account.SendEmailVerification(alphanumericRng, _dateTimeService, emailSender, domainModelConfiguration);

            await _database.SaveChangesAsync();

            return Ok();
        }

        [HttpGet("verify/{token}")]
        [AllowAnonymous]
        public async Task<IActionResult> VerifyEmail(
            [FromRoute] string inputToken)
        {
            var queryResultToken = await _database.EmailVerificationTokens.FirstOrDefaultAsync(token => token.Token == inputToken);

            queryResultToken.Verify(inputToken, _dateTimeService);

            return Ok();
        }
    }
}
