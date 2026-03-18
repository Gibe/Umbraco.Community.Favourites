using Cork.Models;
using Umbraco.Cms.Infrastructure.Migrations;

namespace Cork.Migrations;

public class AddSortOrderToFavourites : AsyncMigrationBase
{
    public AddSortOrderToFavourites(IMigrationContext context) : base(context) { }

    protected override async Task MigrateAsync()
    {
        if (!ColumnExists(CorkFavourite.TableName, "sortOrder"))
        {
            await Database.ExecuteAsync($"ALTER TABLE {CorkFavourite.TableName} ADD COLUMN sortOrder INTEGER NOT NULL DEFAULT 0");
        }
    }
}
