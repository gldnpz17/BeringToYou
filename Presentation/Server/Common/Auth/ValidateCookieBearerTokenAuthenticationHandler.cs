using DomainModel.Common;
using DomainModel.Services;
using EFCoreDatabase;
using Microsoft.AspNetCore.Authentication;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text.Encodings.Web;
using System.Threading.Tasks;

namespace Server.Common.Auth
{
    public class ValidateCookieBearerTokenAuthenticationHandler : AuthenticationHandler<CookieBearerTokenAuthenticationSchemeOptions>
    {
        private readonly AppDbContext _database;
        private readonly IDateTimeService _dateTimeService;
        private readonly DomainModelConfiguration _domainModelConfiguration;

        public ValidateCookieBearerTokenAuthenticationHandler(
            AppDbContext database,
            IDateTimeService dateTimeService,
            DomainModelConfiguration domainModelConfiguration,
            IOptionsMonitor<CookieBearerTokenAuthenticationSchemeOptions> options,
            ILoggerFactory logger,
            UrlEncoder encoder,
            ISystemClock clock) : base(options, logger, encoder, clock)
        {
            _database = database;
            _dateTimeService = dateTimeService;
            _domainModelConfiguration = domainModelConfiguration;
        }

        protected override async Task<AuthenticateResult> HandleAuthenticateAsync()
        {
            // Check the HTTP header first. If it doesn't exist, check the cookies.
            var httpRequestToken = Request.Headers["Auth-Token"].FirstOrDefault() ?? Request.Cookies["auth-token"];

            if (httpRequestToken == null)
            {
                return AuthenticateResult.NoResult();
            }

            var tokenQueryResult = await _database.AuthenticationTokens.FirstOrDefaultAsync(token => token.Token == httpRequestToken);

            if (tokenQueryResult == null)
            {
                return AuthenticateResult.Fail("Token not found.");
            }

            var tokenIsValid = tokenQueryResult.Verify(_dateTimeService, _domainModelConfiguration);

            if (tokenIsValid)
            {
                var account = tokenQueryResult.Account;

                var adminAccount = await _database.AdminAccounts.FirstOrDefaultAsync(adminAccount => adminAccount.Id == account.Id);

                var claims = new List<Claim>()
                {
                    new Claim("AccountId", account.Id.ToString()),

                    new Claim("IsAdmin", (adminAccount != null).ToString()),

                    new Claim(
                        PermissionNameConstants.CanManageAccounts,
                        (adminAccount?.Permissions.CanManageAccounts ?? false).ToString()),

                    new Claim(
                        PermissionNameConstants.CanManagePermissions,
                        (adminAccount?.Permissions.CanManagePermissions ?? false).ToString()),

                    new Claim(
                        PermissionNameConstants.CanManageMap,
                        (adminAccount?.Permissions.CanManageMap ?? false).ToString()),

                    new Claim(
                        PermissionNameConstants.CanManageShops,
                        (adminAccount?.Permissions.CanManageShops ?? false).ToString()),

                    new Claim(
                        PermissionNameConstants.CanManageBackups,
                        (adminAccount?.Permissions.CanManageBackups ?? false).ToString())
                };

                var claimsIdentity = new ClaimsIdentity(claims);

                var ticket = new AuthenticationTicket(new ClaimsPrincipal(claimsIdentity), Scheme.Name);

                return AuthenticateResult.Success(ticket);
            }
            else
            {
                _database.AuthenticationTokens.Remove(tokenQueryResult);

                await _database.SaveChangesAsync();

                if (Request.Cookies["auth-token"] != null)
                {
                    Response.Cookies.Delete("auth-token");
                }

                return AuthenticateResult.Fail("Token no longer valid.");
            }
        }
    }
}