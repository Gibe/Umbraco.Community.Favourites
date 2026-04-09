using Favourites.Repositories;
using Umbraco.Cms.Core.Events;
using Umbraco.Cms.Core.Notifications;

namespace Favourites.NotificationHandlers;

public class ContentMovedToRecycleBinNotificationHandler
    : INotificationHandler<ContentMovedToRecycleBinNotification>
{
    private readonly IFavouritesRepository _favouritesRepository;

    public ContentMovedToRecycleBinNotificationHandler(IFavouritesRepository favouritesRepository)
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
