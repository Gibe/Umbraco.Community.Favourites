using Umbraco.Cms.Core.Events;
using Umbraco.Cms.Core.Notifications;

namespace Favourites.NotificationHandlers;

// New user groups start with no permissions, so grant ours to keep favourites on by default.
// Only new groups are touched, so admins can still remove it from an existing group.
public class UserGroupSavingNotificationHandler : INotificationHandler<UserGroupSavingNotification>
{
    public void Handle(UserGroupSavingNotification notification)
    {
        foreach (var group in notification.SavedEntities.Where(g => g.HasIdentity is false))
        {
            group.Permissions.Add(Constants.PermissionVerb);
        }
    }
}
