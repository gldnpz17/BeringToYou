using DomainModel.ValueObjects;
using EFCoreDatabase;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Server.Common;
using Server.Common.Auth;
using Server.Common.Configuration;
using Server.Models.Request;
using Server.Models.Response;
using Server.Services;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Server.Controllers.Merchant.VerificationRequests
{
    [Route("api/merchant/verification-requests/{accountId}/photos")]
    [ApiController]
    public class PhotosController : ApiControllerBase
    {
        private readonly IFileSystemService _fileSystemService;
        private readonly ApplicationConfiguration _applicationConfiguration;

        public PhotosController(
            AppDbContext database,
            IAuthorizationService authorizationService,
            IFileSystemService fileSystemService,
            ApplicationConfiguration applicationConfiguration) : base(database, authorizationService)
        {
            _fileSystemService = fileSystemService;
            _applicationConfiguration = applicationConfiguration;
        }

        [HttpPost]
        public async Task<IActionResult> UploadMerchantVerificationPhoto(
            [FromRoute]Guid accountId,
            [FromForm(Name = "photo")]IFormFile photo)
        {
            await AuthorizeAccountOwner(accountId);

            _fileSystemService.ValidateExtension(
                Path.GetExtension(photo.FileName),
                _applicationConfiguration.MerchantVerification.AllowedPhotoExtensions);

            var account = await _database.MerchantAccounts.FirstOrDefaultAsync(account => account.Id == accountId);

            string generatedFilename = await _fileSystemService.SaveFileAsync(photo, _applicationConfiguration.MerchantVerification.PhotosDirectory);

            account.VerificationRequest.VerificationPhotos.Add(new MerchantVerificationPhoto()
            {
                Filename = generatedFilename
            });

            await _database.SaveChangesAsync();

            return Ok();
        }

        [HttpGet("{filename}")]
        public async Task<IActionResult> DownloadMerchantVerificationPhoto(
            [FromRoute]Guid accountId,
            [FromRoute]string filename)
        {
            await AuthorizeAccountOwner(accountId, PermissionNameConstants.CanManageAccounts);

            _fileSystemService.CheckFilename(filename);

            var filePath = Path.Combine(
                _applicationConfiguration.MerchantVerification.PhotosDirectory,
                filename);

            if (System.IO.File.Exists(filePath))
            {
                return PhysicalFile(filePath, MimeTypes.GetMimeType(filename));
            }
            else
            {
                return NotFound();
            }
        }

        [HttpDelete("{filename}")]
        public async Task<IActionResult> DeleteMerchantVerificationPhoto([FromRoute]string filename, [FromRoute]Guid accountId)
        {
            await AuthorizeAccountOwner(accountId);

            _fileSystemService.CheckFilename(filename);

            var account = await _database.MerchantAccounts.FirstOrDefaultAsync(account => account.Id == accountId);

            var photoToRemove = account.VerificationRequest.VerificationPhotos.FirstOrDefault(photo => photo.Filename == filename);
            account.VerificationRequest.VerificationPhotos.Remove(photoToRemove);

            await _fileSystemService.DeleteFileAsync(
                _applicationConfiguration.MerchantVerification.PhotosDirectory,
                filename);

            return Ok();
        }
    }
}
