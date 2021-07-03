using AutoMapper;
using DomainModel.Entities;
using EFCoreDatabase;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Server.Common;
using Server.Common.ExtensionMethods;
using Server.Models.Response;
using Server.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Server.Controllers.Products
{
    [Route("products")]
    [ApiController]
    public class ProductsController : ApiControllerBase
    {
        public ProductsController(AppDbContext database, IAuthorizationService authorizationService) : base(database, authorizationService)
        {

        }

        [HttpGet]
        [AllowAnonymous]
        public async Task<IList<ProductSummary>> ReadAllProducts(
            [FromQuery]string keywords,
            [FromQuery]string categories,
            [FromQuery]string sort,
            [FromQuery]int start,
            [FromQuery]int count,
            [FromServices]IPaginationService paginationService,
            [FromServices]IMapper mapper)
        {
            var splitKeywords = keywords.Split('+');

            var products = await paginationService.PaginateAsync(
                _database.Products
                .Where(product => product.Name.ContainsKeywords(splitKeywords) || product.Description.ContainsKeywords(splitKeywords)),
                start,
                count);

            var productSummaries = mapper.Map<List<Product>, List<ProductSummary>>(products.ToList());

            return productSummaries;
        }

        [HttpGet("{productId}")]
        [AllowAnonymous]
        public async Task<ProductDetailed> ReadProductById([FromRoute]Guid productId, [FromServices]IMapper mapper)
        {
            var product = await _database.Products.FirstOrDefaultAsync(product => product.Id == productId);

            var productDetailed = mapper.Map<ProductDetailed>(product);

            return productDetailed;
        }
    }
}
