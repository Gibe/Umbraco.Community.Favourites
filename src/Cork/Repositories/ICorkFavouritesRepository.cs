using Cork.Models;
using Umbraco.Cms.Infrastructure.Scoping;

namespace Cork.Repositories;

public interface ICorkFavouritesRepository
{
    IEnumerable<CorkFavourite> GetFavourites(Guid userKey);
    void AddFavourite(Guid userKey, Guid nodeKey);
    void RemoveFavourite(Guid userKey, Guid nodeKey);
}

public class CorkFavouritesRepository : ICorkFavouritesRepository
{
    private readonly IScopeProvider _scopeProvider;

    public CorkFavouritesRepository(IScopeProvider scopeProvider)
    {
        _scopeProvider = scopeProvider;
    }

    public IEnumerable<CorkFavourite> GetFavourites(Guid userKey)
    {
        using var scope = _scopeProvider.CreateScope();
        var results = scope.Database.Fetch<CorkFavourite>(
            "WHERE userKey = @0", userKey);
        scope.Complete();
        return results;
    }

    public void AddFavourite(Guid userKey, Guid nodeKey)
    {
        using var scope = _scopeProvider.CreateScope();
        var existing = scope.Database.FirstOrDefault<CorkFavourite>(
            "WHERE userKey = @0 AND nodeKey = @1", userKey, nodeKey);

        if (existing == null)
        {
            scope.Database.Insert(new CorkFavourite
            {
                UserKey = userKey,
                NodeKey = nodeKey,
            });
        }

        scope.Complete();
    }

    public void RemoveFavourite(Guid userKey, Guid nodeKey)
    {
        using var scope = _scopeProvider.CreateScope();
        scope.Database.Execute(
            $"DELETE FROM {CorkFavourite.TableName} WHERE userKey = @0 AND nodeKey = @1",
            userKey, nodeKey);
        scope.Complete();
    }
}