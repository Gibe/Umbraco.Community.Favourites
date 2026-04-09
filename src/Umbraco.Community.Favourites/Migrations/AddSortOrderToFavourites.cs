using Favourites.Models;
using Umbraco.Cms.Infrastructure.Migrations;

namespace Favourites.Migrations;

public class AddSortOrderToFavourites : AsyncMigrationBase
{
    public AddSortOrderToFavourites(IMigrationContext context) : base(context) { }

    protected override async Task MigrateAsync()
    {
        if (!TableExists(Favourite.TableName))
        {
            throw new Exception("The favourites table does not exist. Please run the initial migration to create the table before running this migration.");
        }
        var tableName = Favourite.TableName;
        if (!ColumnExists(tableName, "sortOrder"))
        {
            await Database.ExecuteAsync($"ALTER TABLE {tableName} ADD COLUMN sortOrder INTEGER NOT NULL DEFAULT 0");
        }
    }
}
