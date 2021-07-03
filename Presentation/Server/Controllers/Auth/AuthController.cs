using AutoMapper;
using EFCoreDatabase;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Server.Common;
using Server.Models.Response;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Server.Controllers.Auth
{
    [Route("api/auth")]
    [ApiController]
    public class AuthController : ApiControllerBase
    {
        private readonly IMapper _mapper;

        public AuthController(
            AppDbContext database,
            IAuthorizationService authorizationService,
            IMapper mapper) : base(database, authorizationService)
        {
            _mapper = mapper;
        }

        [HttpGet("get-identity")]
        [Authorize]
        public async Task<UserIdentity> GetIdentity()
        {
            var account = await GetLoggedInAccount();

            var identity = _mapper.Map<UserIdentity>(account);

            return identity;
        }
    }
}
