using Umbraco.Cms.Core.Packaging;

namespace Favourites.Migrations;

public class FavouritesMigrationPlan : PackageMigrationPlan
{
    // packageName must match "name" in umbraco-package.json or the backoffice lists the plan
    // separately under "Migrations". planName stays "Favourites" so existing sites keep their migration state.
    public FavouritesMigrationPlan() : base("Umbraco.Community.Favourites", "Favourites") { }

    protected override void DefinePlan()
    {
        To<AddFavouritesTable>(nameof(AddFavouritesTable));
        To<AddSortOrderToFavourites>(nameof(AddSortOrderToFavourites));
        To<AddUsePermissionToUserGroups>(nameof(AddUsePermissionToUserGroups));
        To<CopyLegacyFavourites>(nameof(CopyLegacyFavourites));
    }
}
