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
    [Route("map/points-of-interest")]
    [ApiController]
    public class PointOfInterestCategoriesController : ApiControllerBase
    {
        public PointOfInterestCategoriesController(AppDbContext database, IAuthorizationService authorizationService) : base(database, authorizationService)
        {

        }

        [HttpPost]
        [Authorize(PolicyNameConstants.Admin.CanManageMap)]
        public async Task<IActionResult> CreatePointOfInterestCategory(
            [FromBody]CreatePointOfInterestCategoryBody body,
            [FromServices]IMapper mapper)
        {
            var newCategory = mapper.Map<PointOfInterestCategory>(body);

            await _database.PointOfInterestCategories.AddAsync(newCategory);

            await _database.SaveChangesAsync();

            return Ok();
        }

        [HttpGet]
        [AllowAnonymous]
        public async Task<IList<PointOfInterestCategorySummary>> ReadAllPointOfInterestCategories([FromServices]IMapper mapper)
        {
            var categories = await _database.PointOfInterestCategories.ToListAsync();

            var categorySummaries = mapper.Map<List<PointOfInterestCategory>, List<PointOfInterestCategorySummary>>(categories);

            return categorySummaries;
        }

        [HttpPut("{categoryId}")]
        [Authorize(PolicyNameConstants.Admin.CanManageMap)]
        public async Task<IActionResult> UpdatePointOfInterestCategory(
            [FromRoute]Guid categoryId, 
            [FromBody]UpdatePointOfInterestCategoryBody body,
            [FromServices]IMapper mapper)
        {
            var category = await _database.PointOfInterestCategories.FirstOrDefaultAsync(category => category.Id == categoryId);

            mapper.Map(body, category);

            await _database.SaveChangesAsync();

            return Ok();
        }

        [HttpDelete("{categoryId}")]
        [Authorize(PolicyNameConstants.Admin.CanManageMap)]
        public async Task<IActionResult> DeletePointOfInterestCategory(
            [FromRoute]Guid categoryId,
            [FromServices]IFileSystemService fileSystemService,
            [FromServices]ApplicationConfiguration applicationConfiguration)
        {
            var category = await _database.PointOfInterestCategories.FirstOrDefaultAsync(category => category.Id == categoryId);

            await fileSystemService.DeleteFileAsync(applicationConfiguration.PublicAssetsDirectory, category.IconFilename);

            _database.PointOfInterestCategories.Remove(category);

            await _database.SaveChangesAsync();

            return Ok();
        }

        [HttpPut("{categoryId}/icon")]
        [Authorize(PolicyNameConstants.Admin.CanManageMap)]
        public async Task<IActionResult> UpdateIcon(
            [FromRoute]Guid categoryId, 
            [FromForm(Name = "icon")]IFormFile icon,
            [FromServices]IFileSystemService fileSystemService,
            [FromServices]ApplicationConfiguration applicationConfiguration)
        {
            var category = await _database.PointOfInterestCategories.FirstOrDefaultAsync(category => category.Id == categoryId);

            await fileSystemService.DeleteFileAsync(applicationConfiguration.PublicAssetsDirectory, category.IconFilename);

            var generatedFilename = await fileSystemService.SaveFileAsync(icon, applicationConfiguration.PublicAssetsDirectory);

            category.IconFilename = generatedFilename;

            await _database.SaveChangesAsync();

            return Ok();
        }
    }
}
