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
    [Route("api/map/legends")]
    [ApiController]
    public class LegendsController : ApiControllerBase
    {
        public LegendsController(
            AppDbContext database, 
            IAuthorizationService authorizationService) : base(database, authorizationService)
        {

        }

        [HttpPost]
        [Authorize(PolicyNameConstants.Admin.CanManageMap)]
        public async Task<IActionResult> CreateMapLegend(
            [FromServices] IMapper mapper,
            [FromBody] CreateMapLegendBody body)
        {
            var newLegend = mapper.Map<MapLegend>(body);

            await _database.MapLegends.AddAsync(newLegend);

            await _database.SaveChangesAsync();

            return Ok();
        }

        [HttpGet]
        [AllowAnonymous]
        public async Task<IList<MapLegendSummary>> ReadAllMapLegends([FromServices] IMapper mapper)
        {
            var legends = await _database.MapLegends.ToListAsync();

            var legendSummaries = mapper.Map<List<MapLegend>, List<MapLegendSummary>>(legends);

            return legendSummaries;
        }

        [HttpPut("{legendId}")]
        [Authorize(PolicyNameConstants.Admin.CanManageMap)]
        public async Task<IActionResult> UpdateMapLegend(
            [FromServices] IMapper mapper,
            [FromRoute] Guid legendId,
            [FromBody] UpdateMapLegendBody body)
        {
            var legend = await _database.MapLegends.FirstAsync(legend => legend.Id == legendId);

            mapper.Map(body, legend);

            await _database.SaveChangesAsync();

            return Ok();
        }

        [HttpDelete("{legendId}")]
        [Authorize(PolicyNameConstants.Admin.CanManageMap)]
        public async Task<IActionResult> DeleteMapLegend([FromRoute] Guid legendId)
        {
            var legend = await _database.MapLegends.FirstAsync(legend => legend.Id == legendId);

            _database.MapLegends.Remove(legend);

            await _database.SaveChangesAsync();

            return Ok();
        }

        [HttpPut("{legendId}/icon")]
        [Authorize(PolicyNameConstants.Admin.CanManageMap)]
        public async Task<IActionResult> UpdateIcon(
            [FromRoute] Guid legendId,
            [FromForm(Name = "icon")] IFormFile icon,
            [FromServices] IFileSystemService fileSystemService,
            [FromServices] ApplicationConfiguration applicationConfiguration) 
        {
            var legend = await _database.MapLegends.FirstAsync(legend => legend.Id == legendId);

            var generatedFilename = await fileSystemService.SaveFileAsync(icon, applicationConfiguration.PublicAssetsDirectory);

            legend.IconFilename = generatedFilename;

            await _database.SaveChangesAsync();

            return Ok();
        }
    }
}
