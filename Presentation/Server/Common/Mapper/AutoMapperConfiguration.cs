using AutoMapper;
using Server.Models.Response;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Server.Common.Mapper
{
    public class AutoMapperConfiguration
    {
        public MapperConfiguration MapperConfiguration 
        { 
            get 
            {
                return new MapperConfiguration(config =>
                {
                    config.CreateMap<DomainModel.Structs.PasswordAuthenticationResult, PasswordAuthenticationResult>();

                    config.CreateMap<DomainModel.Structs.TwoFactorAuthenticationResult, TwoFactorAuthenticationResult>();

                    config.CreateMap<DomainModel.Entities.Shop, ShopSummary>();

                    config.CreateMap<DomainModel.Entities.AdminPermissionPreset, PermissionPreset>();
                });
            } 
        }
    }
}
