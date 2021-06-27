using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DomainModel.ValueObjects
{
    public class BackupCode
    {
        public string HashedCode { get; set; }
        public string Salt { get; set; }
    }
}
