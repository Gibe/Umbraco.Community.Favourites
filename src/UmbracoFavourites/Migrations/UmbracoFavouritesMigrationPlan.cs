using Umbraco.Cms.Core.Packaging;

namespace UmbracoFavourites.Migrations;

public class UmbracoFavouritesMigrationPlan : PackageMigrationPlan
{
    public UmbracoFavouritesMigrationPlan() : base("Cork") { }

    protected override void DefinePlan()
    {
        To<AddFavouritesTable>("cork-favourites-001");
        To<AddSortOrderToFavourites>("cork-favourites-002");
        To<RenameTableToUmbracoFavourite>("umbraco-favourites-003");
    }
}
