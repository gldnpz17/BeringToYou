using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Server.Common.Configuration
{
    public class SecretsConfiguration
    {
        private static string secretStorage = Environment.GetEnvironmentVariable("SECRET_STORAGE");

        public string DefaultAdminPassword { get; private set; }
        public string TotpEncryptionSecret { get; private set; }
        public string DatabaseConnectionString { get; private set; }

        public static SecretsConfiguration GetSecrets()
        {
            switch (secretStorage)
            {
                case "EnvironmentVariables":
                    Console.WriteLine($"Fetching secrets from environment variables.");
                    return GetEnvironmentVariableSecrets();
                case "Json":
                    Console.WriteLine($"Fetching secrets from json file.");
                    return GetJsonSecrets();
                default:
                    if (Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT") == "Development")
                    {
                        Console.WriteLine($"Using development secrets.");
                        return GetDevelopmentSecrets();
                    }
                    else
                    {
                        throw new Exception("Invalid secrets storage.");
                    }
            }
        }

        private static SecretsConfiguration GetEnvironmentVariableSecrets()
        {
            return new SecretsConfiguration()
            {
                DefaultAdminPassword = Environment.GetEnvironmentVariable("DEFAULT_ADMIN_PASSWORD"),
                TotpEncryptionSecret = Environment.GetEnvironmentVariable("TOTP_ENCRYPTION_SECRET"),
                DatabaseConnectionString = Environment.GetEnvironmentVariable("DATABASE_CONNECTION_STRING")
            };
        } 

        private static SecretsConfiguration GetJsonSecrets()
        {
            throw new NotImplementedException();
        }

        private static SecretsConfiguration GetDevelopmentSecrets()
        {
            return new SecretsConfiguration()
            {
                DefaultAdminPassword = "password",
                TotpEncryptionSecret = "topsekrit",
                DatabaseConnectionString = ""
            };
        }
    }
}
