using Umbraco.Cms.Infrastructure.Migrations;

namespace UmbracoFavourites.Migrations;

public class RenameTableToUmbracoFavourite : AsyncMigrationBase
{
    public RenameTableToUmbracoFavourite(IMigrationContext context) : base(context) { }

    protected override async Task MigrateAsync()
    {
        if (TableExists("corkFavourite"))
        {
            await Database.ExecuteAsync("ALTER TABLE corkFavourite RENAME TO umbracoFavourite");
        }
    }
}
