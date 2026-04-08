using UmbracoFavourites.Models;
using Umbraco.Cms.Infrastructure.Migrations;

namespace UmbracoFavourites.Migrations;

public class AddSortOrderToFavourites : AsyncMigrationBase
{
    public AddSortOrderToFavourites(IMigrationContext context) : base(context) { }

    protected override async Task MigrateAsync()
    {
        var tableName = TableExists("corkFavourite") ? "corkFavourite" : UmbracoFavourite.TableName;
        if (!ColumnExists(tableName, "sortOrder"))
        {
            await Database.ExecuteAsync($"ALTER TABLE {tableName} ADD COLUMN sortOrder INTEGER NOT NULL DEFAULT 0");
        }
    }
}
