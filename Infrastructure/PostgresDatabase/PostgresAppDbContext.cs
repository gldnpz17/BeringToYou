using EFCoreDatabase;
using Microsoft.EntityFrameworkCore;
using System;

namespace PostgresDatabase
{
    public class PostgresAppDbContext : AppDbContext
    {
        private readonly string _connectionString;

        public PostgresAppDbContext() { }

        public PostgresAppDbContext(string connectionString)
        {
            _connectionString = connectionString;
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            base.OnConfiguring(optionsBuilder);
            optionsBuilder.UseNpgsql(_connectionString);
        }
    }
}
