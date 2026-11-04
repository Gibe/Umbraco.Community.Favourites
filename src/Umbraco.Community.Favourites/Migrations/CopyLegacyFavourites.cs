using Favourites.Models;
using Umbraco.Cms.Infrastructure.Migrations;

namespace Favourites.Migrations;

// Rescues sites that already ran the plan once and ended up with an empty new table
// while their favourites were still sitting in the legacy table.
public class CopyLegacyFavourites : AsyncMigrationBase
{
    public CopyLegacyFavourites(IMigrationContext context) : base(context) { }

    protected override async Task MigrateAsync()
    {
        if (!TableExists(AddFavouritesTable.LegacyTableName) || !TableExists(Favourite.TableName))
        {
            return;
        }

        var existing = await Database.ExecuteScalarAsync<int>($"SELECT COUNT(*) FROM {Favourite.TableName}");
        if (existing > 0)
        {
            return;
        }

        // The legacy table may predate the sortOrder column, so fall back to 0 when it is missing
        var sortOrderSource = ColumnExists(AddFavouritesTable.LegacyTableName, "sortOrder") ? "sortOrder" : "0";

        await Database.ExecuteAsync(
            $"INSERT INTO {Favourite.TableName} (userKey, nodeKey, sortOrder) " +
            $"SELECT userKey, nodeKey, {sortOrderSource} FROM {AddFavouritesTable.LegacyTableName}");
    }
}
