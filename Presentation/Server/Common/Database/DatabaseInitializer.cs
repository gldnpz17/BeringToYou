using DomainModel.Common;
using DomainModel.Entities;
using DomainModel.Services;
using EFCoreDatabase;
using Microsoft.EntityFrameworkCore;
using System;
using System.Threading.Tasks;

namespace Server.Common.Database
{
    public class DatabaseInitializer
    {
        private readonly AppDbContext _database;
        private readonly IPasswordHasher _passwordHasher;
        private readonly IAlphanumericRng _alphanumericRng;
        private readonly DomainModelConfiguration _domainModelConfiguration;
        private readonly string _defaultAdminPassword;

        public DatabaseInitializer(
            AppDbContext database,
            IPasswordHasher passwordHasher,
            IAlphanumericRng alphanumericRng,
            DomainModelConfiguration domainModelConfiguration,
            string defaultAdminPassword)
        {
            _database = database;
            _passwordHasher = passwordHasher;
            _alphanumericRng = alphanumericRng;
            _domainModelConfiguration = domainModelConfiguration;
            _defaultAdminPassword = defaultAdminPassword;
        }

        public async Task Initialize()
        {
            var superAdminPreset = await _database.PermissionPresets.FirstOrDefaultAsync(preset => preset.Name == "SuperAdmin");

            if (superAdminPreset == null)
            {
                await _database.PermissionPresets.AddAsync(new AdminPermissionPreset()
                {
                    Name = "Default",
                    CanManageAccounts = false,
                    CanManageBackups = false,
                    CanManagePermissions = false,
                    CanManageShops = false,
                    CanManageMap = false
                });

                await _database.PermissionPresets.AddAsync(new AdminPermissionPreset()
                {
                    Name = "SuperAdmin",
                    CanManageAccounts = true,
                    CanManageBackups = true,
                    CanManagePermissions = true,
                    CanManageShops = true,
                    CanManageMap = true
                });

                await _database.SaveChangesAsync();

                Console.WriteLine("Initialized SuperAdmin permissions.");
            }

            var superAdminAccount = await _database.Accounts.FirstOrDefaultAsync(account => account.Username == "SuperAdmin");

            if (superAdminAccount == null)
            {
                var preset = await _database.PermissionPresets.FirstOrDefaultAsync(preset => preset.Name == "SuperAdmin");

                var account = new AdminAccount(
                    "SuperAdmin",
                    "INVALID_MAIL",
                    "SuperAdmin",
                    _defaultAdminPassword,
                    _passwordHasher,
                    _alphanumericRng,
                    _domainModelConfiguration,
                    preset);

                await _database.Accounts.AddAsync(account);

                await _database.SaveChangesAsync();

                Console.WriteLine("Initialized SuperAdmin account.");
            }
        }
    }
}