using Microsoft.EntityFrameworkCore;
using Server.Services;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.ServiceImplementation
{
    public class PaginationService : IPaginationService
    {
        public async Task<IList<T>> PaginateAsync<T>(IQueryable<T> source, int startIndex, int count)
        {
            return await source.Skip(startIndex).Take(count).ToListAsync();
        }
    }
}