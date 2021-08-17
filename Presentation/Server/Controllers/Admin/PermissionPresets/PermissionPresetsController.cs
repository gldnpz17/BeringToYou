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
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Server.Controllers.Admin.PermissionPresets
{
    [Route("api/admin/permission-presets")]
    [ApiController]
    public class PermissionPresetsController : ApiControllerBase
    {
        public PermissionPresetsController(
            AppDbContext database,
            IAuthorizationService authorizationService) : base(database, authorizationService)
        {
        }

        [HttpGet]
        [Authorize(PolicyNameConstants.AdminsOnly)]
        public async Task<IList<PermissionPreset>> GetAllPermissionPresets([FromServices] IMapper mapper)
        {
            var permissionPresets = await _database.PermissionPresets.ToListAsync();

            return mapper.Map<List<AdminPermissionPreset>, List<PermissionPreset>>(permissionPresets);
        }

        [HttpPost]
        [Authorize(PolicyNameConstants.Admin.CanManagePermissions)]
        public async Task<IActionResult> CreatePermissionPreset([FromBody] CreatePermissionPresetBody body)
        {
            var preset = new AdminPermissionPreset() { Name = body.Name };

            await _database.PermissionPresets.AddAsync(preset);

            await _database.SaveChangesAsync();

            return Ok();
        }

        [HttpPut("{presetName}")]
        [Authorize(PolicyNameConstants.Admin.CanManagePermissions)]
        public async Task<IActionResult> UpdatePermissionPreset(
            [FromRoute] string presetName,
            [FromBody] UpdatePermissionPresetBody body,
            [FromServices] IMapper mapper)
        {
            var existingPreset = await _database.PermissionPresets.FirstOrDefaultAsync(preset => preset.Name == presetName);

            mapper.Map(body, existingPreset);

            await _database.SaveChangesAsync();

            return Ok();
        }

        [HttpDelete("{presetName}")]
        [Authorize(PolicyNameConstants.Admin.CanManagePermissions)]
        public async Task<IActionResult> DeletePermissionPreset([FromRoute] string presetName)
        {
            var preset = await _database.PermissionPresets.FirstOrDefaultAsync(preset => preset.Name == presetName);

            _database.PermissionPresets.Remove(preset);

            await _database.SaveChangesAsync();

            return Ok();
        }
    }
}