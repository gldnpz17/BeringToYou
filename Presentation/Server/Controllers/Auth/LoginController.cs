using AutoMapper;
using DomainModel.Common;
using DomainModel.Services;
using EFCoreDatabase;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Server.Common;
using Server.Models.Request;
using Server.Models.Response;
using System.Threading.Tasks;

namespace Server.Controllers.Auth
{
    [Route("api/auth/login")]
    [ApiController]
    public class LoginController : ApiControllerBase
    {
        private readonly IDateTimeService _dateTimeService;
        private readonly IAlphanumericRng _alphanumericRng;
        private readonly IMapper _mapper;
        private readonly DomainModelConfiguration _domainModelConfiguration;

        public LoginController(
            AppDbContext database,
            IAuthorizationService authorizationService,
            IDateTimeService dateTimeService,
            IAlphanumericRng alphanumericRng,
            IMapper mapper,
            DomainModelConfiguration domainModelConfiguration) : base(database, authorizationService)
        {
            _dateTimeService = dateTimeService;
            _alphanumericRng = alphanumericRng;
            _mapper = mapper;
            _domainModelConfiguration = domainModelConfiguration;
        }

        [HttpPost("password")]
        [AllowAnonymous]
        public async Task<PasswordAuthenticationResult> PasswordLogin(
            [FromBody] PasswordLoginBody body,
            [FromServices] IPasswordHasher passwordHasher,
            [FromServices] DomainModelConfiguration domainModelConfiguration)
        {
            var account = await _database.Accounts.FirstOrDefaultAsync(account => account.Username == body.Username);

            var loginResult = account.PasswordLogin(
                body.Password,
                _alphanumericRng,
                _dateTimeService,
                passwordHasher,
                domainModelConfiguration);

            var authenticationResult = _mapper.Map<PasswordAuthenticationResult>(loginResult);

            await _database.SaveChangesAsync();

            if (authenticationResult.NeedsTwoFactor == false)
            {
                HttpContext.Response.Cookies.Append(
                    "auth-token",
                    authenticationResult.Token,
                    new CookieOptions()
                    {
                        HttpOnly = true,
                        SameSite = SameSiteMode.Strict,
                        Secure = true
                    });
            }

            return authenticationResult;
        }

        [HttpPost("totp")]
        [AllowAnonymous]
        public async Task<TwoFactorAuthenticationResult> TotpLogin(
            [FromBody] TotpLoginBody body,
            [FromServices] IAesEncryptionService aesEncryptionService,
            [FromServices] ITotpService totpService)
        {
            var account = await _database.Accounts.FirstOrDefaultAsync(account => account.Email == body.Email);

            var loginResult = account.TotpLogin(
                body.TwoFactorToken,
                body.Totp,
                _dateTimeService,
                aesEncryptionService,
                totpService,
                _alphanumericRng,
                _domainModelConfiguration);

            var authenticationResult = _mapper.Map<TwoFactorAuthenticationResult>(loginResult);

            await _database.SaveChangesAsync();

            return authenticationResult;
        }

        [HttpPost("backup-code")]
        [AllowAnonymous]
        public async Task<TwoFactorAuthenticationResult> BackupCodeLogin(
            [FromBody] BackupCodeLoginBody loginData,
            [FromServices] IPasswordHasher passwordHasher)
        {
            var account = await _database.Accounts.FirstOrDefaultAsync(account => account.Email == loginData.Email);

            var loginResult = account.BackupCodeLogin(
                loginData.TwoFactorToken,
                loginData.BackupCode,
                _dateTimeService,
                passwordHasher,
                _alphanumericRng,
                _domainModelConfiguration);

            var authenticationResult = _mapper.Map<TwoFactorAuthenticationResult>(loginResult);

            await _database.SaveChangesAsync();

            return authenticationResult;
        }
    }
}