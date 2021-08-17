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
using Server.Common.Exceptions;
using Server.Models.Request;
using Server.Models.Response;
using Server.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Controllers.Map
{
    [Route("api/map/floors")]
    [ApiController]
    public class FloorsController : ApiControllerBase
    {
        public FloorsController(AppDbContext database, IAuthorizationService authorizationService) : base(database, authorizationService)
        {
        }

        [HttpPost]
        [Authorize(PolicyNameConstants.Admin.CanManageMap)]
        public async Task<IActionResult> CreateMapFloor(
            [FromBody] CreateMapFloorBody body,
            [FromServices] IMapper mapper)
        {
            var existingFloor = await _database.MapFloors.FirstOrDefaultAsync(floor => floor.FloorNumber == body.FloorNumber);

            if (existingFloor != null)
            {
                throw new AppException(AppExceptionCode.CONFLICTING_FLOOR_NUMBER, "Floor number must be unique.");
            }

            var newFloor = mapper.Map<MapFloor>(body);

            await _database.MapFloors.AddAsync(newFloor);

            await _database.SaveChangesAsync();

            return Ok();
        }

        [HttpGet]
        [AllowAnonymous]
        public async Task<IList<MapFloorSummary>> ReadAllMapFloors([FromServices] IMapper mapper)
        {
            var floors = await _database.MapFloors.ToListAsync();

            var floorSummaries = mapper.Map<List<MapFloor>, List<MapFloorSummary>>(floors);

            floorSummaries = floorSummaries.OrderBy(floor => floor.FloorNumber).ToList();

            return floorSummaries;
        }

        [HttpPut("{floorId}")]
        [Authorize(PolicyNameConstants.Admin.CanManageMap)]
        public async Task<IActionResult> UpdateMapFloor(
            [FromRoute] Guid floorId,
            [FromBody] UpdateMapFloorBody body,
            [FromServices] IMapper mapper)
        {
            var existingFloor = await _database.MapFloors.FirstOrDefaultAsync(floor => floor.FloorNumber == body.FloorNumber);

            if (existingFloor != null)
            {
                throw new AppException(AppExceptionCode.CONFLICTING_FLOOR_NUMBER, "Floor number must be unique.");
            }

            var floor = await _database.MapFloors.FirstOrDefaultAsync(floor => floor.Id == floorId);

            mapper.Map(body, floor);

            await _database.SaveChangesAsync();

            return Ok();
        }

        [HttpDelete("{floorId}")]
        [Authorize(PolicyNameConstants.Admin.CanManageMap)]
        public async Task<IActionResult> DeleteMapFloor(
            [FromRoute] Guid floorId,
            [FromServices] IFileSystemService fileSystemService,
            [FromServices] ApplicationConfiguration applicationConfiguration)
        {
            var floor = await _database.MapFloors.FirstOrDefaultAsync(floor => floor.Id == floorId);

            await fileSystemService.DeleteFileAsync(applicationConfiguration.PublicAssetsDirectory, floor.KmlFilename);

            _database.MapFloors.Remove(floor);

            await _database.SaveChangesAsync();

            return Ok();
        }

        [HttpPut("{floorId}/kml")]
        [Authorize(PolicyNameConstants.Admin.CanManageMap)]
        public async Task<IActionResult> UpdateKml(
            [FromRoute] Guid floorId,
            [FromForm(Name = "kml")] IFormFile kml,
            [FromServices] IFileSystemService fileSystemService,
            [FromServices] ApplicationConfiguration applicationConfiguration)
        {
            var floor = await _database.MapFloors.FirstAsync(floor => floor.Id == floorId);

            await fileSystemService.DeleteFileAsync(applicationConfiguration.PublicAssetsDirectory, floor.KmlFilename);

            var generatedFilename = await fileSystemService.SaveFileAsync(kml, applicationConfiguration.PublicAssetsDirectory);

            floor.KmlFilename = generatedFilename;

            await _database.SaveChangesAsync();

            return Ok();
        }
    }
}