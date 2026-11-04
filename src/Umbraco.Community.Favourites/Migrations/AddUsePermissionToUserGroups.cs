using Umbraco.Cms.Infrastructure.Migrations;
using Umbraco.Cms.Infrastructure.Persistence.Dtos;

namespace Favourites.Migrations;

// Keeps the package install-and-go: every existing user group gets the permission so behaviour is unchanged
// on upgrade. Admins can then remove it from the groups that shouldn't have favourites.
public class AddUsePermissionToUserGroups : AsyncMigrationBase
{
    public AddUsePermissionToUserGroups(IMigrationContext context) : base(context) { }

    protected override async Task MigrateAsync()
    {
        var groups = await Database.FetchAsync<UserGroupDto>();
        var existing = await Database.FetchAsync<UserGroup2PermissionDto>();

        foreach (var group in groups)
        {
            var alreadyGranted = existing.Any(p => p.UserGroupKey == group.Key && p.Permission == Constants.PermissionVerb);
            if (alreadyGranted)
            {
                continue;
            }

            await Database.InsertAsync(new UserGroup2PermissionDto
            {
                UserGroupKey = group.Key,
                Permission = Constants.PermissionVerb,
            });
        }
    }
}
