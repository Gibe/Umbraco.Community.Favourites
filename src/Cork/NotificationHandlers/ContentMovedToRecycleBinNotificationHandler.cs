using Cork.Repositories;
using Umbraco.Cms.Core.Events;
using Umbraco.Cms.Core.Notifications;

namespace Cork.NotificationHandlers;

public class ContentMovedToRecycleBinNotificationHandler
    : INotificationHandler<ContentMovedToRecycleBinNotification>
{
    private readonly ICorkFavouritesRepository _favouritesRepository;

    public ContentMovedToRecycleBinNotificationHandler(ICorkFavouritesRepository favouritesRepository)
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
