using UmbracoFavourites.Repositories;
using Umbraco.Cms.Core.Events;
using Umbraco.Cms.Core.Notifications;

namespace UmbracoFavourites.NotificationHandlers;

public class ContentMovedToRecycleBinNotificationHandler
    : INotificationHandler<ContentMovedToRecycleBinNotification>
{
    private readonly IUmbracoFavouritesRepository _favouritesRepository;

    public ContentMovedToRecycleBinNotificationHandler(IUmbracoFavouritesRepository favouritesRepository)
    {
        _favouritesRepository = favouritesRepository;
    }

    public void Handle(ContentMovedToRecycleBinNotification notification)
    {
        foreach (var movedItem in notification.MoveInfoCollection)
        {
            _favouritesRepository.RemoveFavouritesByNodeKey(movedItem.Entity.Key);
        }
    }
}
