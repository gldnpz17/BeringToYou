using AutoMapper;
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
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Server.Controllers.OnlineShopPlatforms
{
    [Route("online-shop-platforms")]
    [ApiController]
    public class OnlineShopPlatformController : ApiControllerBase
    {
        public OnlineShopPlatformController(AppDbContext database, IAuthorizationService authorizationService) : base(database, authorizationService)
        {

        }

        [HttpPost]
        [Authorize(PolicyNameConstants.Admin.CanManageShops)]
        public async Task<IActionResult> CreateOnlineShopPlatform(
            [FromBody]CreateOnlineShopPlatformBody body,
            [FromServices]IMapper mapper)
        {
            var newPlatform = mapper.Map<DomainModel.Entities.OnlineShopPlatform>(body);

            await _database.OnlineShopPlatforms.AddAsync(newPlatform);

            await _database.SaveChangesAsync();

            return Ok();
        }

        [HttpGet]
        [Authorize(PolicyNameConstants.Admin.CanManageShops)]
        public async Task<IList<OnlineShopPlatformSummary>> ReadAllOnlineShopPlatforms([FromServices]IMapper mapper)
        {
            var platforms = await _database.OnlineShopPlatforms.ToListAsync();

            var mappedPlatforms = mapper.Map<List<DomainModel.Entities.OnlineShopPlatform>, List<OnlineShopPlatformSummary>>(platforms);

            return mappedPlatforms;
        }

        [HttpPut("{platformId}")]
        [Authorize(PolicyNameConstants.Admin.CanManageShops)]
        public async Task<IActionResult> UpdateOnlineShopPlatform(
            [FromRoute]Guid platformId,
            [FromBody]UpdateOnlineShopBody body,
            [FromServices]IMapper mapper)
        {
            var platform = await _database.OnlineShopPlatforms.FirstOrDefaultAsync(platform => platform.Id == platformId);

            mapper.Map(body, platform);

            await _database.SaveChangesAsync();

            return Ok();
        }

        [HttpDelete("{platformId}")]
        [Authorize(PolicyNameConstants.Admin.CanManageShops)]
        public async Task<IActionResult> DeleteOnlineShopPlatform([FromRoute]Guid platformId)
        {
            var platform = await _database.OnlineShopPlatforms.FirstOrDefaultAsync(platform => platform.Id == platformId);

            _database.Remove(platform);

            await _database.SaveChangesAsync();

            return Ok();
        }

        [HttpPut("{platformId}/icon")]
        [Authorize(PolicyNameConstants.Admin.CanManageShops)]
        public async Task<IActionResult> UpdateOnlineShopPlatformIcon(
            [FromRoute]Guid platformId, 
            [FromForm]IFormFile icon,
            [FromServices]IFileSystemService fileSystemService,
            [FromServices]ApplicationConfiguration applicationConfiguration)
        {
            var platform = await _database.OnlineShopPlatforms.FirstOrDefaultAsync(platform => platform.Id == platformId);

            await fileSystemService.DeleteFileAsync(applicationConfiguration.PublicAssetsDirectory, platform.IconFilename);

            var generatedFilename = await fileSystemService.SaveFileAsync(icon, applicationConfiguration.PublicAssetsDirectory);

            platform.IconFilename = generatedFilename;

            await _database.SaveChangesAsync();

            return Ok();
        }
    }
}
