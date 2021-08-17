using AutoMapper;
using DomainModel.Entities;
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
using System.Threading.Tasks;

namespace Server.Controllers.Map
{
    [Route("api/map/overlays")]
    [ApiController]
    public class OverlaysController : ApiControllerBase
    {
        public OverlaysController(AppDbContext database, IAuthorizationService authorizationService) : base(database, authorizationService)
        {
        }

        [HttpPost]
        [Authorize(PolicyNameConstants.Admin.CanManageMap)]
        public async Task<IActionResult> CreateMapOverlay([FromBody] CreateMapOverlayBody body, [FromServices] IMapper mapper)
        {
            var newOverlay = mapper.Map<MapOverlay>(body);

            await _database.MapOverlays.AddAsync(newOverlay);

            await _database.SaveChangesAsync();

            return Ok();
        }

        [HttpGet]
        [AllowAnonymous]
        public async Task<IList<MapOverlaySummary>> ReadAllMapOverlays([FromServices] IMapper mapper)
        {
            var overlays = await _database.MapOverlays.ToListAsync();

            var overlaySummaries = mapper.Map<List<MapOverlay>, List<MapOverlaySummary>>(overlays);

            return overlaySummaries;
        }

        [HttpPut("{overlayId}")]
        [Authorize(PolicyNameConstants.Admin.CanManageMap)]
        public async Task<IActionResult> UpdateMapOverlay(
            [FromRoute] Guid overlayId,
            [FromBody] UpdateMapOverlayBody body,
            [FromServices] IMapper mapper)
        {
            var overlay = await _database.MapOverlays.FirstOrDefaultAsync(overlay => overlay.Id == overlayId);

            mapper.Map(body, overlay);

            await _database.SaveChangesAsync();

            return Ok();
        }

        [HttpDelete("{overlayId}")]
        [Authorize(PolicyNameConstants.Admin.CanManageMap)]
        public async Task<IActionResult> DeleteMapOverlay(
            [FromRoute] Guid overlayId,
            [FromServices] IFileSystemService fileSystemService,
            [FromServices] ApplicationConfiguration applicationConfiguration)
        {
            var overlay = await _database.MapOverlays.FirstOrDefaultAsync(overlay => overlay.Id == overlayId);

            await fileSystemService.DeleteFileAsync(applicationConfiguration.PublicAssetsDirectory, overlay.KmlFilename);
            await fileSystemService.DeleteFileAsync(applicationConfiguration.PublicAssetsDirectory, overlay.IconFilename);

            _database.MapOverlays.Remove(overlay);

            await _database.SaveChangesAsync();

            return Ok();
        }

        [HttpPut("{overlayId}/kml")]
        [Authorize(PolicyNameConstants.Admin.CanManageMap)]
        public async Task<IActionResult> UpdateKml(
            [FromRoute] Guid overlayId,
            [FromForm] IFormFile kml,
            [FromServices] IFileSystemService fileSystemService,
            [FromServices] ApplicationConfiguration applicationConfiguration)
        {
            var overlay = await _database.MapOverlays.FirstOrDefaultAsync(overlay => overlay.Id == overlayId);

            await fileSystemService.DeleteFileAsync(applicationConfiguration.PublicAssetsDirectory, overlay.KmlFilename);

            var generatedFilename = await fileSystemService.SaveFileAsync(kml, applicationConfiguration.PublicAssetsDirectory);

            overlay.KmlFilename = generatedFilename;

            await _database.SaveChangesAsync();

            return Ok();
        }

        [HttpPut("{overlayId}/icon")]
        [Authorize(PolicyNameConstants.Admin.CanManageMap)]
        public async Task<IActionResult> UpdateIcon(
            [FromRoute] Guid overlayId,
            [FromForm] IFormFile icon,
            [FromServices] IFileSystemService fileSystemService,
            [FromServices] ApplicationConfiguration applicationConfiguration)
        {
            var overlay = await _database.MapOverlays.FirstOrDefaultAsync(overlay => overlay.Id == overlayId);

            await fileSystemService.DeleteFileAsync(applicationConfiguration.PublicAssetsDirectory, overlay.IconFilename);

            var generatedFilename = await fileSystemService.SaveFileAsync(icon, applicationConfiguration.PublicAssetsDirectory);

            overlay.IconFilename = generatedFilename;

            await _database.SaveChangesAsync();

            return Ok();
        }
    }
}