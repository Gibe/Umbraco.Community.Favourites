using NPoco;
using Umbraco.Cms.Infrastructure.Persistence.DatabaseAnnotations;

namespace Favourites.Models;

[TableName(TableName)]
[PrimaryKey("id", AutoIncrement = true)]
public class Favourite
{
    public const string TableName = "communityFavourites";

    [PrimaryKeyColumn(AutoIncrement = true)]
    [Column("id")]
    public int Id { get; set; }

    [Column("userKey")]
    public Guid UserKey { get; set; }

    [Column("nodeKey")]
    public Guid NodeKey { get; set; }

    [Column("sortOrder")]
    public int SortOrder { get; set; }
}
