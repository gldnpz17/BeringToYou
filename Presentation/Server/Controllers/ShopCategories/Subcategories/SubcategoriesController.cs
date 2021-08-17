using AutoMapper;
using EFCoreDatabase;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Server.Common;
using Server.Common.Auth;
using Server.Models.Request;
using System;
using System.Threading.Tasks;

namespace Server.Controllers.ShopCategories.Subcategories
{
    [Route("api/shops/shop-categories/subcategories")]
    [ApiController]
    public class SubcategoriesController : ApiControllerBase
    {
        public SubcategoriesController(AppDbContext database, IAuthorizationService authorizationService) : base(database, authorizationService)
        {
        }

        [HttpPut("{subcategoryId}")]
        [Authorize(PolicyNameConstants.Admin.CanManageShops)]
        public async Task<IActionResult> UpdateSubcategory(
            [FromRoute] Guid subcategoryId,
            [FromBody] UpdateShopSubcategoryBody body,
            [FromServices] IMapper mapper)
        {
            var subcategory = await _database.ShopSubcategories.FirstOrDefaultAsync(subcategory => subcategory.Id == subcategoryId);

            if (subcategory == null)
            {
                return NotFound();
            }

            mapper.Map(body, subcategory);

            await _database.SaveChangesAsync();

            return Ok();
        }

        [HttpDelete("{subcategoryId}")]
        [Authorize(PolicyNameConstants.Admin.CanManageShops)]
        public async Task<IActionResult> DeleteSubCategory([FromRoute] Guid subcategoryId)
        {
            var subcategory = await _database.ShopSubcategories.FirstOrDefaultAsync(subcategory => subcategory.Id == subcategoryId);

            if (subcategory == null)
            {
                return NotFound();
            }

            _database.ShopSubcategories.Remove(subcategory);

            await _database.SaveChangesAsync();

            return Ok();
        }
    }
}