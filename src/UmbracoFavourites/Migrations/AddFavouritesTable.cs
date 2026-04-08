using UmbracoFavourites.Models;
using Umbraco.Cms.Infrastructure.Migrations;

namespace UmbracoFavourites.Migrations;

public class AddFavouritesTable : AsyncMigrationBase
{
    public AddFavouritesTable(IMigrationContext context) : base(context) { }

    protected override async Task MigrateAsync()
    {
        if (!TableExists("corkFavourite") && !TableExists(UmbracoFavourite.TableName))
        {
            Create.Table<UmbracoFavourite>().Do();
        }
    }
}
