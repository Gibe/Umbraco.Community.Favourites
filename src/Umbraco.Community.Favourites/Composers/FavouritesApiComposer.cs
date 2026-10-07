using Microsoft.AspNetCore.Mvc.Controllers;
using Microsoft.Extensions.DependencyInjection;
using Favourites.Repositories;
using Favourites.NotificationHandlers;
using Umbraco.Cms.Api.Common.OpenApi;
using Umbraco.Cms.Api.Management.OpenApi;
using Umbraco.Cms.Core.Composing;
using Umbraco.Cms.Core.DependencyInjection;
using Umbraco.Cms.Core.Notifications;

namespace Favourites.Composers
{
    public class FavouritesApiComposer : IComposer
    {
        public void Compose(IUmbracoBuilder builder)
        {
            builder.Services.AddScoped<IFavouritesRepository, FavouritesRepository>();

            builder.AddNotificationHandler<ContentMovedToRecycleBinNotification, ContentMovedToRecycleBinNotificationHandler>();

            // Related documentation:
            // https://docs.umbraco.com/umbraco-cms/tutorials/creating-a-backoffice-api
            builder.AddBackOfficeOpenApiDocument(Constants.ApiName, document => document
                .WithTitle("Favourites Backoffice API")
                .WithBackOfficeAuthentication()
                .ConfigureOpenApiOptions(options =>
                {
                    // Generate nice operation IDs in the OpenAPI document, so that the generated
                    // TypeScript client has nice method names and not too verbose
                    // https://docs.umbraco.com/umbraco-cms/tutorials/creating-a-backoffice-api/umbraco-schema-and-operation-ids#operation-ids
                    options.AddOperationTransformer((operation, context, _) =>
                    {
                        if (context.Description.ActionDescriptor is ControllerActionDescriptor descriptor
                            && descriptor.ControllerTypeInfo.Namespace?.StartsWith("Favourites.Controllers", StringComparison.InvariantCultureIgnoreCase) is true)
                        {
                            operation.OperationId = descriptor.ActionName;
                        }

                        return Task.CompletedTask;
                    });
                }));
        }
    }
}
