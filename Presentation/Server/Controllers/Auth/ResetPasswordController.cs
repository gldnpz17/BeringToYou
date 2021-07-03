using DomainModel.Common;
using DomainModel.Services;
using EFCoreDatabase;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Server.Common;
using Server.Models.Request;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Server.Controllers.Auth
{
    [Route("/api/auth/reset-password")]
    public class ResetPasswordController : ApiControllerBase
    {
        private readonly IDateTimeService _dateTimeService;
        private readonly DomainModelConfiguration _domainModelConfiguration;

        public ResetPasswordController(
            AppDbContext database,
            IAuthorizationService authorizationService,
            IDateTimeService dateTimeService,
            DomainModelConfiguration domainModelConfiguration) : base(database, authorizationService)
        {
            _dateTimeService = dateTimeService;
            _domainModelConfiguration = domainModelConfiguration;
        }

        [HttpPost("send-email")]
        [AllowAnonymous]
        public async Task<IActionResult> SendPasswordResetEmail(
            [FromBody] SendPasswordResetEmailBody body,
            [FromServices] IEmailSender emailSender,
            [FromServices] IAlphanumericRng alphanumericRng)
        {
            var account = await _database.Accounts.FirstOrDefaultAsync(account => account.Email == body.Email);

            account.PasswordCredential.SendPasswordResetToken(
                emailSender, 
                alphanumericRng, 
                _dateTimeService, 
                _domainModelConfiguration);

            await _database.SaveChangesAsync();

            return Ok();
        }

        [HttpPost]
        [AllowAnonymous]
        public async Task<IActionResult> ResetPassword(
            [FromBody] ResetPasswordBody body,
            [FromServices] IPasswordHasher passwordHasher)
        {
            var account = await _database.Accounts.FirstOrDefaultAsync(account => account.Email == body.Email);

            account.PasswordCredential.ResetPassword(
                body.Token,
                body.NewPassword,
                passwordHasher,
                _dateTimeService,
                _domainModelConfiguration);

            await _database.SaveChangesAsync();

            return Ok();
        }
    }
}
