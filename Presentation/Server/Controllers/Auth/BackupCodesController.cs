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
    [Route("api/auth/backup-codes")]
    [ApiController]
    public class BackupCodesController : ApiControllerBase
    {
        public BackupCodesController(
            AppDbContext database,
            IAuthorizationService authorizationService) : base(database, authorizationService)
        {

        }

        [HttpGet("exists")]
        [Authorize]
        public async Task<bool> CheckBackupCodeExistence()
        {
            var account = await GetLoggedInAccount();

            if (account.BackupCodeCredential == null)
            {
                return false;
            }
            else
            {
                return true;
            }
        }

        [HttpPost]
        [Authorize]
        public async Task<BackupCodesList> GenerateBackupCodes(
            [FromServices] IPasswordHasher passwordHasher,
            [FromServices] IAlphanumericRng alphanumericRng,
            [FromServices] DomainModelConfiguration domainModelConfiguration)
        {
            var account = await GetLoggedInAccount();

            var backupCodeCredential = new BackupCodeCredential(account);
            account.BackupCodeCredential = backupCodeCredential;

            var backupCodes = backupCodeCredential.GenerateBackupCodes(passwordHasher, alphanumericRng, domainModelConfiguration);

            await _database.SaveChangesAsync();

            return new BackupCodesList()
            {
                BackupCodes = backupCodes
            };
        }

        [HttpDelete]
        [Authorize]
        public async Task<IActionResult> DeleteBackupCodes()
        {
            var account = await GetLoggedInAccount();

            account.BackupCodeCredential = null;

            await _database.SaveChangesAsync();

            return Ok();
        }
    }
}
