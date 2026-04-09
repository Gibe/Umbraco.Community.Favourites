using Favourites.Models;
using Umbraco.Cms.Infrastructure.Migrations;

namespace Favourites.Migrations;

public class AddFavouritesTable : AsyncMigrationBase
{
    public AddFavouritesTable(IMigrationContext context) : base(context) { }

    protected override async Task MigrateAsync()
    {
        if (!TableExists(Favourite.TableName))
        {
            Create.Table<Favourite>().Do();
        }
    }
}
