using AutoMapper;
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
                    #region Accounts
                    config.CreateMap<DomainModel.Entities.AccountBase, Models.Response.AccountSummary>();

                    config.CreateMap<DomainModel.Entities.AccountBase, Models.Response.AccountDetailed>();

                    config.CreateMap<Models.Request.UpdateAccountBody, DomainModel.Entities.AccountBase>();
                    #endregion

                    #region Admin
                    config.CreateMap<DomainModel.Entities.AdminAccount, Models.Response.AdminAccountSummary>()
                        .ForMember(
                            destination => destination.PermissionPresetName,
                            options => options.MapFrom(source => source.Permissions.Name ?? null));

                    config.CreateMap<DomainModel.Entities.AdminPermissionPreset, Models.Response.PermissionPreset>()
                        .ForMember(
                            destination => destination.CanBackupData,
                            options => options.MapFrom(source => source.CanManageBackups));

                    config.CreateMap<Models.Request.UpdatePermissionPresetBody, DomainModel.Entities.AdminPermissionPreset>()
                        .ForMember(
                            destination => destination.CanManageBackups,
                            options => options.MapFrom(source => source.CanBackupData));
                    #endregion

                    #region Auth
                    config.CreateMap<DomainModel.Entities.AccountBase, Models.Response.UserIdentity>()
                        .ForMember(
                            destination => destination.AccountId,
                            options => options.MapFrom(source => source.Id));

                    config.CreateMap<DomainModel.Structs.PasswordAuthenticationResult, Models.Response.PasswordAuthenticationResult>();

                    config.CreateMap<DomainModel.Structs.TwoFactorAuthenticationResult, Models.Response.TwoFactorAuthenticationResult>();
                    #endregion

                    #region Map
                    config.CreateMap<Models.Request.CreateMapFloorBody, DomainModel.Entities.MapFloor>();

                    config.CreateMap<DomainModel.Entities.MapFloor, Models.Response.MapFloorSummary>();

                    config.CreateMap<Models.Request.UpdateMapFloorBody, DomainModel.Entities.MapFloor>();

                    config.CreateMap<Models.Request.CreateMapOverlayBody, DomainModel.Entities.MapOverlay>();

                    config.CreateMap<DomainModel.Entities.MapOverlay, Models.Response.MapOverlaySummary>();

                    config.CreateMap<Models.Request.UpdateMapOverlayBody, DomainModel.Entities.MapOverlay>();

                    config.CreateMap<Models.Request.CreatePointOfInterestCategoryBody, DomainModel.Entities.PointOfInterestCategory>();

                    config.CreateMap<DomainModel.Entities.PointOfInterestCategory, Models.Response.PointOfInterestCategorySummary>();

                    config.CreateMap<Models.Request.UpdatePointOfInterestCategoryBody, DomainModel.Entities.PointOfInterestCategory>();

                    config.CreateMap<Models.Request.CreatePointOfInterestBody, DomainModel.Entities.PointOfInterest>();

                    config.CreateMap<DomainModel.Entities.PointOfInterest, Models.Response.PointOfInterestSummary>();

                    config.CreateMap<Models.Request.UpdatePointOfInterestBody, DomainModel.Entities.PointOfInterest>();
                    #endregion

                    #region Merchant
                    config.CreateMap<DomainModel.Entities.MerchantAccount, Models.Response.MerchantAccountSummary>()
                        .ForMember(
                            destination => destination.Verified,
                            options => options.MapFrom(source => source.VerificationRequest.Accepted));

                    config.CreateMap<DomainModel.Entities.MerchantVerificationRequest, Models.Response.MerchantVerificationRequestSummary>();

                    config.CreateMap<DomainModel.Entities.MerchantVerificationRequest, Models.Response.MerchantVerificationRequestDetailed>()
                        .ForMember(
                            destination => destination.VerificationPhotoFilenames,
                            options => options.MapFrom(source => source.VerificationPhotos));

                    config.CreateMap<DomainModel.ValueObjects.MerchantVerificationPhoto, string>()
                        .ConvertUsing(source => source.Filename);
                    #endregion

                    #region OnlineShopPlatforms
                    config.CreateMap<Models.Request.CreateOnlineShopPlatformBody, DomainModel.Entities.OnlineShopPlatform>();

                    config.CreateMap<DomainModel.Entities.OnlineShopPlatform, Models.Response.OnlineShopPlatformSummary>();

                    config.CreateMap<Models.Request.UpdateOnlineShopBody, DomainModel.Entities.OnlineShopPlatform>();
                    #endregion

                    #region ProductCategories
                    config.CreateMap<Models.Request.CreateProductCategoryBody, DomainModel.Entities.ProductCategory>();

                    config.CreateMap<DomainModel.Entities.ProductCategory, Models.Response.ProductCategorySummary>();

                    config.CreateMap<Models.Request.UpdateProductCategoryBody, DomainModel.Entities.ProductCategory>();
                    #endregion

                    #region Products
                    config.CreateMap<DomainModel.Entities.Product, Models.Response.ProductSummary>();

                    config.CreateMap<DomainModel.Entities.Product, Models.Response.ProductDetailed>();
                    #endregion

                    #region ShopCategories
                    config.CreateMap<Models.Request.CreateShopCategoryBody, DomainModel.Entities.ShopCategory>();

                    config.CreateMap<DomainModel.Entities.ShopCategory, Models.Response.ShopCategorySummary>();

                    config.CreateMap<Models.Request.UpdateShopCategoryBody, DomainModel.Entities.ShopCategory>();
                    #endregion

                    #region Shops
                    config.CreateMap<Models.Request.CreateProductBody, DomainModel.Entities.Product>();

                    // NOTE: product fetching-related object mappings already configured above.

                    config.CreateMap<Models.Request.UpdateProductBody, DomainModel.Entities.Product>();

                    config.CreateMap<Models.Request.CreateOnlineShopInstanceBody, DomainModel.Entities.OnlineShopInstance>();

                    config.CreateMap<DomainModel.Entities.OnlineShopInstance, Models.Response.OnlineShopInstanceSummary>();

                    config.CreateMap<Models.Request.UpdateOnlineShopBody, DomainModel.Entities.OnlineShopInstance>();

                    config.CreateMap<Models.Request.CreateShopBody, DomainModel.Entities.Shop>();

                    config.CreateMap<DomainModel.Entities.Shop, Models.Response.ShopSummary>()
                        .ForMember(
                            destination => destination.ShopCategoryName,
                            options => options.MapFrom(source => source.Category.Name));

                    config.CreateMap<DomainModel.Entities.Shop, Models.Response.ShopDetailed>();

                    config.CreateMap<Models.Request.UpdateShopBody, DomainModel.Entities.Shop>();
                    #endregion
                });
            } 
        }
    }
}
