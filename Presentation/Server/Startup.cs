using AutoMapper;
using DomainModel.Common;
using DomainModel.Entities;
using DomainModel.Services;
using DomainModelServiceImplementations.AesEncryptionService;
using DomainModelServiceImplementations.AlphanumericRng;
using DomainModelServiceImplementations.DateTimeService;
using DomainModelServiceImplementations.EmailSender;
using DomainModelServiceImplementations.PasswordHasher;
using DomainModelServiceImplementations.TotpService;
using EFCoreDatabase;
using InMemoryDatabase;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Server.Common.Auth;
using Server.Common.Auth.AuthorizationHandlers;
using Server.Common.Middlewares.ApplicationExceptionHandler;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server
{
    public class Startup
    {
        private readonly IWebHostEnvironment _environment;

        public Startup(IWebHostEnvironment environment)
        {
            _environment = environment;
        }

        // This method gets called by the runtime. Use this method to add services to the container.
        // For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=398940
        public void ConfigureServices(IServiceCollection services)
        {
            // Register controllers.
            services.AddControllers();

            // Register authorization.
            services.AddAuthorization(config =>
            {
                config.AddPolicy(
                    PolicyNameConstants.AccountOwner,
                    policy => policy.Requirements.Add(new AccountOwnerRequirement()));

                config.AddPolicy(
                    PolicyNameConstants.AdminsOnly,
                    policy => policy.RequireClaim("IsAdmin", new string[] { "true" }));

                config.AddPolicy(
                    PolicyNameConstants.Admin.CanManageAccounts,
                    policy => policy.RequireClaim("CanManageAccounts", new string[] { "true" }));

                config.AddPolicy(
                    PolicyNameConstants.Admin.CanManagePermissions,
                    policy => policy.RequireClaim("CanManagePermissions", new string[] { "true" }));

                config.AddPolicy(
                    PolicyNameConstants.Admin.CanManageMap,
                    policy => policy.RequireClaim("CanManageMap", new string[] { "true" }));

                config.AddPolicy(
                    PolicyNameConstants.Admin.CanManageShops,
                    policy => policy.RequireClaim("CanManageShops", new string[] { "true" }));
                
                config.AddPolicy(
                    PolicyNameConstants.Admin.CanManageBackups,
                    policy => policy.RequireClaim("CanManageBackups", new string[] { "true" }));
            });
            services.AddSingleton<IAuthorizationHandler, AccountOwnerAuthorizationHandler>();

            // Register configuration.
            if (_environment.IsDevelopment())
            {
                services.AddSingleton(new DomainModelConfiguration(totpSecretEncryptionKey: "ChangeThisInProd"));
                services.AddSingleton(new ApplicationConfiguration());
            }

            // Register database.
            if (_environment.IsDevelopment())
            {
                var database = new InMemoryAppDbContext("TestDatabase");

                var permission = database.PermissionPresets.FirstOrDefault(permission => permission.Name == "SuperAdmin");

                var account = new AdminAccount(
                    "admin",
                    "mail@mail.com",
                    "THE Admin",
                    permission)
                {
                    PasswordCredential = new PasswordCredential(
                        "password123", 
                        new PasswordHasher(), 
                        new AlphanumericRng(), 
                        new DomainModelConfiguration(totpSecretEncryptionKey: "ChangeThisInProd"))
                };

                database.AdminAccounts.Add(account);

                database.SaveChanges();

                services.AddTransient<AppDbContext, InMemoryAppDbContext>(serviceProvider => 
                {
                    return new InMemoryAppDbContext("TestDatabase");
                });
            }

            // Register domain model services.
            services.AddSingleton<IAesEncryptionService, AesEncryptionService>();
            services.AddSingleton<IAlphanumericRng, AlphanumericRng>();
            services.AddSingleton<IDateTimeService, DateTimeService>();
            services.AddSingleton<IEmailSender, DebugEmailSender>();
            services.AddSingleton<IPasswordHasher, PasswordHasher>();
            services.AddSingleton<ITotpService, TotpService>();

            // Register controller services.
            services.AddSingleton<IFileSystemService, FileSystemService>();
            services.AddSingleton<IImageProcessingService, ImageProcessingService>();
            services.AddSingleton<IPaginationService, PaginationService>();

            // Register object-object mapper.
            services.AddSingleton<IMapper>(new Mapper(new AutoMapperConfiguration().MapperConfiguration));

            // Register static files.
            services.AddSpaStaticFiles(config =>
            {
                config.RootPath = "client-app/build";
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app)
        {
            if (_environment.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseSpaStaticFiles();

            app.UseRouting();

            app.UseApplicationExceptionHandler();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });

            app.UseSpa(config =>
            {
                config.Options.SourcePath = "client-app";

                if (_environment.IsDevelopment())
                {
                    config.UseReactDevelopmentServer(npmScript: "start");
                }
            });
        }
    }
}
