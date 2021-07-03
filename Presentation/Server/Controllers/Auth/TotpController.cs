using DomainModel.Common;
using DomainModel.Entities;
using DomainModel.Services;
using EFCoreDatabase;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Server.Common;
using Server.Models.Response;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Server.Controllers.Auth
{
    [Route("api/auth/totp")]
    [ApiController]
    public class TotpController : ApiControllerBase
    {
        public TotpController(
            AppDbContext database,
            IAuthorizationService authorizationService) : base(database, authorizationService)
        {

        }

        [HttpPost]
        [Authorize]
        public async Task<TotpSharedSecret> SetTotp(
            [FromServices] ITotpService totpService,
            [FromServices] IAesEncryptionService aesEncryptionService,
            [FromServices] DomainModelConfiguration domainModelConfiguration)
        {
            var account = await GetLoggedInAccount();

            var totpCredential = new TotpCredential(totpService, aesEncryptionService, domainModelConfiguration, account);
            account.TotpCredential = totpCredential;

            await _database.SaveChangesAsync();

            return new TotpSharedSecret()
            {
                SharedSecret = totpCredential.RevealSharedSecret(aesEncryptionService, domainModelConfiguration)
            };
        }

        [HttpDelete]
        [Authorize]
        public async Task<IActionResult> RemoveTotp()
        {
            var account = await GetLoggedInAccount();

            account.TotpCredential = null;

            await _database.SaveChangesAsync();

            return Ok();
        }
    }
}
