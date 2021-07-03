using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Server.Common.Configuration;
using Server.Services;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Server.Controllers.Public
{
    [Route("public/assets")]
    [ApiController]
    public class AssetsController : ControllerBase
    {
        [HttpGet("{filename}")]
        [AllowAnonymous]
        public IActionResult DownloadAsset(
            [FromRoute]string filename,
            [FromServices]ApplicationConfiguration applicationConfiguration,
            [FromServices]IFileSystemService fileSystemService)
        {
            fileSystemService.CheckFilename(filename);

            var path = Path.Combine(applicationConfiguration.PublicAssetsDirectory, filename);

            return PhysicalFile(path, MimeTypes.GetMimeType(filename));
        }
    }
}
