using Asp.Versioning;
using Microsoft.AspNetCore.Mvc.ApiExplorer;
using Microsoft.AspNetCore.Mvc.Controllers;
using Microsoft.Extensions.Options;
using Microsoft.Extensions.DependencyInjection;
using Swashbuckle.AspNetCore.SwaggerGen;
using Umbraco.Cms.Core.Composing;
using Umbraco.Cms.Core.DependencyInjection;
using Umbraco.Cms.Api.Management.OpenApi;
using Umbraco.Cms.Api.Common.OpenApi;
using Microsoft.OpenApi;
using Microsoft.AspNetCore.Authorization;
using Favourites.Authorization;
using Favourites.Repositories;
using Favourites.NotificationHandlers;
using Umbraco.Cms.Core.Notifications;

namespace Favourites.Composers
{
    public class FavouritesApiComposer : IComposer
    {
        public void Compose(IUmbracoBuilder builder)
        {
            builder.Services.AddScoped<IFavouritesRepository, FavouritesRepository>();

            builder.Services.AddSingleton<IAuthorizationHandler, FavouritesPermissionHandler>();
            builder.Services.AddAuthorizationBuilder()
                .AddPolicy(Constants.PolicyName, policy => policy.Requirements.Add(new FavouritesPermissionRequirement()));

            builder.AddNotificationHandler<ContentMovedToRecycleBinNotification, ContentMovedToRecycleBinNotificationHandler>();
            builder.AddNotificationHandler<UserGroupSavingNotification, UserGroupSavingNotificationHandler>();

            builder.Services.AddSingleton<IOperationIdHandler, CustomOperationHandler>();

            builder.Services.Configure<SwaggerGenOptions>(opt =>
            {
                // Related documentation:
                // https://docs.umbraco.com/umbraco-cms/tutorials/creating-a-backoffice-api
                // https://docs.umbraco.com/umbraco-cms/tutorials/creating-a-backoffice-api/adding-a-custom-swagger-document
                // https://docs.umbraco.com/umbraco-cms/tutorials/creating-a-backoffice-api/versioning-your-api
                // https://docs.umbraco.com/umbraco-cms/tutorials/creating-a-backoffice-api/access-policies

                opt.SwaggerDoc(Constants.ApiName, new OpenApiInfo
                {
                    Title = "Favourites Backoffice API",
                    Version = "1.0",
                });

                opt.OperationFilter<FavouritesOperationSecurityFilter>();
            });
        }

        public class FavouritesOperationSecurityFilter : BackOfficeSecurityRequirementsOperationFilterBase
        {
            protected override string ApiName => Constants.ApiName;
        }

        // This is used to generate nice operation IDs in our swagger json file
        // So that the generated TypeScript client has nice method names and not too verbose
        // https://docs.umbraco.com/umbraco-cms/tutorials/creating-a-backoffice-api/umbraco-schema-and-operation-ids#operation-ids
        public class CustomOperationHandler : OperationIdHandler
        {
            public CustomOperationHandler(IOptions<ApiVersioningOptions> apiVersioningOptions) : base(apiVersioningOptions)
            {
            }

            protected override bool CanHandle(ApiDescription apiDescription, ControllerActionDescriptor controllerActionDescriptor)
            {
                return controllerActionDescriptor.ControllerTypeInfo.Namespace?.StartsWith("Favourites.Controllers", comparisonType: StringComparison.InvariantCultureIgnoreCase) is true;
            }

            public override string Handle(ApiDescription apiDescription) => $"{apiDescription.ActionDescriptor.RouteValues["action"]}";
        }
    }
}
