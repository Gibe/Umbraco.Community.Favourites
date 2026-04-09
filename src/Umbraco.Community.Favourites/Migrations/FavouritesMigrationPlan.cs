using Umbraco.Cms.Core.Packaging;

namespace Favourites.Migrations;

public class FavouritesMigrationPlan : PackageMigrationPlan
{
    public FavouritesMigrationPlan() : base("Favourites") { }

    protected override void DefinePlan()
    {
        To<AddFavouritesTable>(nameof(AddFavouritesTable));
        To<AddSortOrderToFavourites>(nameof(AddSortOrderToFavourites));
    }
}
