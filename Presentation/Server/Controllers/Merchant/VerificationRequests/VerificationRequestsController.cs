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
using Server.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Server.Controllers.Merchant.VerificationRequests
{
    [Route("api/merchant/verification-requests")]
    public class VerificationRequestsController : ApiControllerBase
    {
        public VerificationRequestsController(
            AppDbContext database,
            IAuthorizationService authorizationService) : base(database, authorizationService)
        {

        }

        [HttpGet]
        [Authorize(PolicyNameConstants.Admin.CanManageAccounts)]
        public async Task<IList<MerchantVerificationRequestSummary>> GetAllMerchantVerificationRequest([FromServices]IMapper mapper)
        {
            var verificationRequests = await _database.MerchantVerificationRequests.ToListAsync();

            return mapper.Map<List<MerchantVerificationRequest>, List<MerchantVerificationRequestSummary>>(verificationRequests);
        }

        [HttpGet("{accountId}")]
        [Authorize(PolicyNameConstants.AuthenticatedUsers)]
        public async Task<MerchantVerificationRequestDetailed> GetMerchantVerificationRequestDetailed(
            [FromRoute]Guid accountId,
            [FromServices]IMapper mapper)
        {
            await AuthorizeAccountOwner(accountId, "CanManageAccounts");

            var account = await _database.MerchantAccounts.FirstOrDefaultAsync(account => account.Id == accountId);

            var verificationRequest = account.VerificationRequest;

            return mapper.Map<MerchantVerificationRequestDetailed>(verificationRequest);
        }

        [HttpPost("{accountId}/accept")]
        [Authorize(PolicyNameConstants.Admin.CanManageAccounts)]
        public async Task<IActionResult> AcceptMerchantVerificationRequest([FromRoute]Guid accountId)
        {
            var account = await _database.MerchantAccounts.FirstOrDefaultAsync(account => account.Id == accountId);

            account.VerificationRequest.AcceptVerification();

            await _database.SaveChangesAsync();

            return Ok();
        }

        [HttpPost("{accountId}/reject")]
        [Authorize(PolicyNameConstants.Admin.CanManageAccounts)]
        public async Task<IActionResult> RejectMerchantVerificationRequest([FromRoute]Guid accountId)
        {
            var account = await _database.MerchantAccounts.FirstOrDefaultAsync(account => account.Id == accountId);

            _database.MerchantAccounts.Remove(account);

            await _database.SaveChangesAsync();

            return Ok();
        }
    }
}
