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

        await Database.ExecuteAsync(
            $"INSERT INTO {Favourite.TableName} (userKey, nodeKey, sortOrder) " +
            $"SELECT userKey, nodeKey, sortOrder FROM {AddFavouritesTable.LegacyTableName}");
    }
}
