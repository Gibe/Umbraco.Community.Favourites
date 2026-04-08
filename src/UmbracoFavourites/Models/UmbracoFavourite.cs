using NPoco;
using Umbraco.Cms.Infrastructure.Persistence.DatabaseAnnotations;

namespace UmbracoFavourites.Models;

[TableName("umbracoFavourite")]
[PrimaryKey("id", AutoIncrement = true)]
public class UmbracoFavourite
{
    public const string TableName = "umbracoFavourite";

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
