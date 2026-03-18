using Cork.Models;
using Umbraco.Cms.Infrastructure.Migrations;

namespace Cork.Migrations;

public class AddFavouritesTable : AsyncMigrationBase
{
    public AddFavouritesTable(IMigrationContext context) : base(context) { }

    protected override async Task MigrateAsync()
    {
        if (!TableExists(CorkFavourite.TableName))
        {
            Create.Table<CorkFavourite>().Do();
        }
    }
}
