using AutoMapper;
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

namespace Server.Controllers.Accounts
{
    [Route("api/admin/accounts/{accountId}/permissions")]
    [ApiController]
    public class PermissionsController : ApiControllerBase
    {
        public PermissionsController(
            AppDbContext database,
            IAuthorizationService authorizationService) : base(database, authorizationService)
        {

        }

        [HttpGet]
        [Authorize(PolicyNameConstants.AdminsOnly)]
        public async Task<PermissionPreset> GetAdminPermissions(
            [FromRoute]Guid accountId,
            [FromServices]IMapper mapper)
        {
            var account = await _database.AdminAccounts.FirstOrDefaultAsync(account => account.Id == accountId);

            var permissions = account.Permissions;

            return mapper.Map<PermissionPreset>(permissions);
        }

        [HttpPut]
        [Authorize(PolicyNameConstants.Admin.CanManagePermissions)]
        public async Task<IActionResult> UpdateAdminPermissions(
            [FromRoute]Guid accountId,
            [FromBody]UpdateAdminPermissionsBody body)
        {
            var account = await _database.AdminAccounts.FirstOrDefaultAsync(account => account.Id == accountId);

            var permissionPreset = await _database.PermissionPresets.FirstOrDefaultAsync(preset => preset.Name == body.PresetName);

            account.Permissions = permissionPreset;

            await _database.SaveChangesAsync();

            return Ok();
        }
    }
}
