using DomainModel.Entities;
using EFCoreDatabase;
using Microsoft.EntityFrameworkCore;
using System;

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
            optionsBuilder.UseInMemoryDatabase(databaseName: _databaseName);
        }
    }
}
