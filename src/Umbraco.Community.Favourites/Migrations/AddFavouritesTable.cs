using Favourites.Models;
using Umbraco.Cms.Infrastructure.Migrations;

namespace Favourites.Migrations;

public class AddFavouritesTable : AsyncMigrationBase
{
    internal const string LegacyTableName = "umbracoFavourite";

    public AddFavouritesTable(IMigrationContext context) : base(context) { }

    protected override Task MigrateAsync()
    {
        if (TableExists(Favourite.TableName))
        {
            return Task.CompletedTask;
        }

        // Sites upgrading from the old package already hold their favourites in the legacy table, so keep them
        if (TableExists(LegacyTableName))
        {
            Rename.Table(LegacyTableName).To(Favourite.TableName).Do();
        }
        else
        {
            Create.Table<Favourite>().Do();
        }

        return Task.CompletedTask;
    }
}
