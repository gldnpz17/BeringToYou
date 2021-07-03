using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Server.Services
{
    public interface IPaginationService
    {
        Task<IList<T>> PaginateAsync<T>(IQueryable<T> source, int startIndex, int count);
    }
}
