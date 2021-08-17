using DomainModel.Common;
using DomainModel.Services;
using EFCoreDatabase;
using Microsoft.Extensions.Hosting;
using Server.Common.Configuration;
using Server.Common.Database;
using System.Threading.Tasks;

namespace Server
{
    public static class InitializationExtension
    {
        public static async Task InitializeAsync(this IHost host)
        {
            var database = (AppDbContext)host.Services.GetService(typeof(AppDbContext));
            var passwordhasher = (IPasswordHasher)host.Services.GetService(typeof(IPasswordHasher));
            var alphanumericRng = (IAlphanumericRng)host.Services.GetService(typeof(IAlphanumericRng));
            var domainModelConfiguration = (DomainModelConfiguration)host.Services.GetService(typeof(DomainModelConfiguration));

            var databaseInitializer = new DatabaseInitializer(
                database,
                passwordhasher,
                alphanumericRng,
                domainModelConfiguration,
                SecretsConfiguration.GetSecrets().DefaultAdminPassword);

            await databaseInitializer.Initialize();
        }
    }
}