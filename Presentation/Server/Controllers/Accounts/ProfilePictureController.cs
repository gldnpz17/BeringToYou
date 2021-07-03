using EFCoreDatabase;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Server.Common;
using Server.Common.Auth;
using Server.Common.Configuration;
using Server.Models.Request;
using Server.Services;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Server.Controllers.Accounts
{
    [Route("accounts/{accountId}/profile-picture")]
    [ApiController]
    public class ProfilePictureController : ApiControllerBase
    {
        private readonly ApplicationConfiguration _applicationConfiguration;

        public ProfilePictureController(
            ApplicationConfiguration applicationConfiguration,
            AppDbContext database,
            IAuthorizationService authorizationService) : base(database, authorizationService)
        {
            _applicationConfiguration = applicationConfiguration;
        }

        [HttpGet]
        [Authorize]
        public async Task<IActionResult> DownloadProfilePicture(
            [FromRoute]Guid accountId)
        {
            var account = await _database.Accounts.FirstOrDefaultAsync(account => account.Id == accountId);

            var filePath = Path.Combine(_applicationConfiguration.Account.ProfilePictureDirectory, account.ProfilePictureFilename);

            return PhysicalFile(filePath, MimeTypes.GetMimeType(filePath));
        }

        [HttpGet]
        [Authorize]
        public async Task<IActionResult> UploadProfilePicture(
            [FromRoute]Guid accountId,
            [FromBody]IFormFile file,
            [FromServices]IFileSystemService fileSystemService)
        {
            await AuthorizeAccountOwner(accountId);

            fileSystemService.ValidateExtension(
                Path.GetExtension(file.FileName),
                _applicationConfiguration.Account.AllowedProfilePictureExtensions);

            var account = await _database.Accounts.FirstOrDefaultAsync(account => account.Id == accountId);

            var generatedFilename = await fileSystemService.SaveFileAsync(file, _applicationConfiguration.Account.ProfilePictureDirectory);

            account.ProfilePictureFilename = generatedFilename;

            await _database.SaveChangesAsync();

            return Ok();
        }

        [HttpDelete]
        [Authorize]
        public async Task<IActionResult> DeleteProfilePicture(
            [FromRoute]Guid accountId,
            [FromServices]IFileSystemService fileSystemService)
        {
            await AuthorizeAccountOwner(accountId);

            var account = await _database.Accounts.FirstOrDefaultAsync(account => account.Id == accountId);

            await fileSystemService.DeleteFileAsync(_applicationConfiguration.Account.ProfilePictureDirectory, account.ProfilePictureFilename);

            account.ProfilePictureFilename = null;

            await _database.SaveChangesAsync();

            return Ok();
        }
    }
}
