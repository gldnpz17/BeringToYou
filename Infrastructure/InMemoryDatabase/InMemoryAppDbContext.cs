using EFCoreDatabase;
using Microsoft.EntityFrameworkCore;

namespace InMemoryDatabase
{
    public class InMemoryAppDbContext : AppDbContext
    {
        private readonly string _databaseName;

        public InMemoryAppDbContext(string databaseName)
        {
            _databaseName = databaseName;
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            base.OnConfiguring(optionsBuilder);
            optionsBuilder.UseInMemoryDatabase(databaseName: _databaseName);
        }
    }
}