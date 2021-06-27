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
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Server.Controllers.Map
{
    [Route("map/floors")]
    [ApiController]
    public class FloorsController : ApiControllerBase
    {
        public FloorsController(AppDbContext database, IAuthorizationService authorizationService) : base(database, authorizationService)
        {

        }

        [HttpPost]
        [Authorize(PolicyNameConstants.Admin.CanManageMap)]
        public async Task<IActionResult> CreateMapFloor(
            [FromBody]CreateMapFloorBody body,
            [FromServices]IMapper mapper)
        {
            var newFloor = mapper.Map<MapFloor>(body);

            await _database.MapFloors.AddAsync(newFloor);

            await _database.SaveChangesAsync();

            return Ok();
        }

        [HttpGet]
        [AllowAnonymous]
        public async Task<IList<MapFloorSummary>> ReadAllMapFloors([FromServices]IMapper mapper)
        {
            var floors = await _database.MapFloors.ToListAsync();

            var floorSummaries = mapper.Map<List<MapFloor>, List<MapFloorSummary>>(floors);

            return floorSummaries;
        }

        [HttpPut("{floorNumber}")]
        [Authorize(PolicyNameConstants.Admin.CanManageMap)]
        public async Task<IActionResult> UpdateMapFloor(
            [FromRoute]int floorNumber, 
            [FromBody]UpdateMapFloorBody body, 
            [FromServices]IMapper mapper)
        {
            var floor = await _database.MapFloors.FirstOrDefaultAsync(floor => floor.FloorNumber == floorNumber);

            mapper.Map(body, floor);

            await _database.SaveChangesAsync();

            return Ok();
        }

        [HttpDelete("{floorNumber}")]
        [Authorize(PolicyNameConstants.Admin.CanManageMap)]
        public async Task<IActionResult> DeleteMapFloor(
            [FromRoute]int floorNumber, 
            [FromServices]IFileSystemService fileSystemService,
            [FromServices]ApplicationConfiguration applicationConfiguration)
        {
            var floor = await _database.MapFloors.FirstOrDefaultAsync(floor => floor.FloorNumber == floorNumber);

            await fileSystemService.DeleteFileAsync(applicationConfiguration.PublicAssetsDirectory, floor.KmlFilename);

            _database.MapFloors.Remove(floor);

            await _database.SaveChangesAsync();

            return Ok();
        }

        [HttpPut("{floorNumber}/kml")]
        [Authorize(PolicyNameConstants.Admin.CanManageMap)]
        public async Task<IActionResult> UpdateKml(
            [FromRoute]int floorNumber, 
            [FromForm(Name = "kml")]IFormFile kml,
            [FromServices]IFileSystemService fileSystemService,
            [FromServices]ApplicationConfiguration applicationConfiguration)
        {
            var floor = await _database.MapFloors.FirstAsync(floor => floor.FloorNumber == floorNumber);

            await fileSystemService.DeleteFileAsync(applicationConfiguration.PublicAssetsDirectory, floor.KmlFilename);

            var generatedFilename = await fileSystemService.SaveFileAsync(kml, applicationConfiguration.PublicAssetsDirectory);

            floor.KmlFilename = generatedFilename;

            await _database.SaveChangesAsync();
            
            return Ok();
        }
    }
}
