using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DomainModel.Services
{
    public interface IPasswordHasher
    {
        string Hash(string password, string salt);
    }
}
