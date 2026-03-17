using Cork.Models;
using Umbraco.Cms.Infrastructure.Migrations;

namespace Cork.Migrations;

public class AddFavouritesTable : MigrationBase
{
    public AddFavouritesTable(IMigrationContext context) : base(context) { }

    protected override void Migrate()
    {
        if (!TableExists(CorkFavourite.TableName))
        {
            Create.Table<CorkFavourite>().Do();
        }
    }
}
