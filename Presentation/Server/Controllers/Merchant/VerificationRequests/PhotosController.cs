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
        [Authorize]
        public async Task<IActionResult> UploadMerchantVerificationPhoto(
            [FromRoute]Guid accountId,
            [FromBody]IFormFile file,
            [FromServices]IImageProcessingService imageProcessingService)
        {
            await AuthorizeAccountOwner(accountId);

            _fileSystemService.ValidateFileFormat(
                Path.GetExtension(file.FileName),
                _applicationConfiguration.MerchantVerification.AllowedPhotoExtensions);

            var account = await _database.MerchantAccounts.FirstOrDefaultAsync(account => account.Id == accountId);

            string generatedFilename = await _fileSystemService.SaveFileAsync(file, _applicationConfiguration.MerchantVerification.PhotosDirectory);

            account.VerificationRequest.VerificationPhotos.Add(new MerchantVerificationPhoto()
            {
                Filename = generatedFilename
            });

            await _database.SaveChangesAsync();

            await imageProcessingService.ResizeImage(
                _applicationConfiguration.MerchantVerification.PhotosDirectory,
                generatedFilename,
                _applicationConfiguration.MerchantVerification.PhotoWidthInPixels,
                _applicationConfiguration.MerchantVerification.PhotoHeightInPixels);

            return Ok();
        }

        [HttpGet("{filename}")]
        [Authorize]
        public async Task<IActionResult> DownloadMerchantVerificationPhoto(
            [FromRoute]Guid accountId,
            [FromRoute]string filename)
        {
            await AuthorizeAccountOwner(accountId, PermissionNameConstants.CanManageAccounts);

            var filePath = Path.Combine(
                _applicationConfiguration.MerchantVerification.PhotosDirectory,
                _fileSystemService.CheckFilename(filename));

            return PhysicalFile(filePath, MimeTypes.GetMimeType(filename));
        }

        [HttpDelete("{filename}")]
        [Authorize]
        public async Task<IActionResult> DeleteMerchantVerificationPhoto([FromRoute]string filename, [FromRoute]Guid accountId)
        {
            await AuthorizeAccountOwner(accountId);

            var account = await _database.MerchantAccounts.FirstOrDefaultAsync(account => account.Id == accountId);

            var photoToRemove = account.VerificationRequest.VerificationPhotos.FirstOrDefault(photo => photo.Filename == filename);
            account.VerificationRequest.VerificationPhotos.Remove(photoToRemove);

            await _fileSystemService.DeleteFile(
                _applicationConfiguration.MerchantVerification.PhotosDirectory,
                _fileSystemService.CheckFilename(filename));

            return Ok();
        }
    }
}
