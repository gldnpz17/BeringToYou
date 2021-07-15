using AutoMapper;
using DomainModel.Entities;
using EFCoreDatabase;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Server.Common;
using Server.Common.Auth;
using Server.Models.Request;
using Server.Models.Response;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Server.Controllers.Map
{
    [Route("api/map/points-of-interest")]
    [ApiController]
    public class PointOfInterestsController : ApiControllerBase
    {
        public PointOfInterestsController(AppDbContext database, IAuthorizationService authorizationService) : base(database, authorizationService)
        {

        }

        [HttpPost]
        [Authorize(PolicyNameConstants.Admin.CanManageMap)]
        public async Task<IActionResult> CreatePointOfInterest(
            [FromBody]CreatePointOfInterestBody body,
            [FromServices]IMapper mapper)
        {
            var newPointOfInterest = mapper.Map<PointOfInterest>(body);

            var category = await _database.PointOfInterestCategories.FirstOrDefaultAsync(category => category.Id == body.CategoryId);
            newPointOfInterest.Category = category;

            await _database.PointOfInterests.AddAsync(newPointOfInterest);

            await _database.SaveChangesAsync();

            return Ok();
        }

        [HttpGet]
        [Authorize(PolicyNameConstants.Admin.CanManageMap)]
        public async Task<IList<PointOfInterestSummary>> ReadAllPointOfInterests([FromServices]IMapper mapper)
        {
            var pointOfInterests = await _database.PointOfInterests.ToListAsync();

            var pointOfInterestSummaries = mapper.Map<List<PointOfInterest>, List<PointOfInterestSummary>>(pointOfInterests);

            return pointOfInterestSummaries;
        }

        [HttpPut("{pointOfInterestId}")]
        [Authorize(PolicyNameConstants.Admin.CanManageMap)]
        public async Task<IActionResult> UpdatePointOfInterest(
            [FromRoute]Guid pointOfInterestId,
            [FromBody]UpdatePointOfInterestBody body,
            [FromServices]IMapper mapper)
        {
            var pointOfInterest = await _database.PointOfInterests.FirstOrDefaultAsync(pointOfInterest => pointOfInterest.Id == pointOfInterestId);

            if (pointOfInterest.Category.Id != body.CategoryId)
            {
                var category = await _database.PointOfInterestCategories.FirstOrDefaultAsync(category => category.Id == body.CategoryId);

                pointOfInterest.Category = category;
            }

            mapper.Map(body, pointOfInterest);

            await _database.SaveChangesAsync();

            return Ok();
        }

        [HttpDelete("{pointOfInterestId}")]
        [Authorize(PolicyNameConstants.Admin.CanManageMap)]
        public async Task<IActionResult> DeletePointOfInterest([FromRoute]Guid pointOfInterestId)
        {
            var pointOfInterest = await _database.PointOfInterests.FirstOrDefaultAsync(pointOfInterest => pointOfInterest.Id == pointOfInterestId);

            _database.Remove(pointOfInterest);

            return Ok();
        }
    }
}
