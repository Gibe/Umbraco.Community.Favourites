using Favourites.Models;
using Umbraco.Cms.Infrastructure.Migrations;

namespace Favourites.Migrations;

public class AddSortOrderToFavourites : AsyncMigrationBase
{
    public AddSortOrderToFavourites(IMigrationContext context) : base(context) { }

    protected override Task MigrateAsync()
    {
        if (!TableExists(Favourite.TableName))
        {
            throw new Exception("The favourites table does not exist. Please run the initial migration to create the table before running this migration.");
        }

        if (!ColumnExists(Favourite.TableName, "sortOrder"))
        {
            // The builder emits the right syntax for each database (raw "ADD COLUMN" is SQLite-only)
            Create.Column("sortOrder")
                .OnTable(Favourite.TableName)
                .AsInt32()
                .NotNullable()
                .WithDefaultValue(0)
                .Do();
        }

        return Task.CompletedTask;
    }
}
