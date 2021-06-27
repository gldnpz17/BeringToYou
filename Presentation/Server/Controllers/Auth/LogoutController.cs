using EFCoreDatabase;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Server.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Server.Controllers.Auth
{
    [Route("api/auth/logout")]
    [ApiController]
    public class LogoutController : ApiControllerBase
    {
        public LogoutController(
            AppDbContext database,
            IAuthorizationService authorizationService) : base(database, authorizationService)
        {

        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> Logout()
        {
            var account = await GetLoggedInAccount();

            var authenticationToken = HttpContext.Request.Headers["Auth-Token"];

            account.Logout(authenticationToken);

            await _database.SaveChangesAsync();

            return Ok();
        }
    }
}
