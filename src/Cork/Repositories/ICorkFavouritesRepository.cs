using Cork.Models;
using Umbraco.Cms.Infrastructure.Scoping;

namespace Cork.Repositories;

public interface ICorkFavouritesRepository
{
    IEnumerable<CorkFavourite> GetFavourites(Guid userKey);
    void AddFavourite(Guid userKey, Guid nodeKey);
    void RemoveFavourite(Guid userKey, Guid nodeKey);
    void RemoveFavouritesByNodeKey(Guid nodeKey);
    void UpdateSortOrder(Guid userKey, IEnumerable<Guid> nodeKeys);
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
            "WHERE userKey = @0 ORDER BY sortOrder", userKey);
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
            var maxSortOrder = scope.Database.ExecuteScalar<int>(
                $"SELECT COALESCE(MAX(sortOrder), -1) FROM {CorkFavourite.TableName} WHERE userKey = @0", userKey);

            scope.Database.Insert(new CorkFavourite
            {
                UserKey = userKey,
                NodeKey = nodeKey,
                SortOrder = maxSortOrder + 1,
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

    public void RemoveFavouritesByNodeKey(Guid nodeKey)
    {
        using var scope = _scopeProvider.CreateScope();
        scope.Database.Execute(
            $"DELETE FROM {CorkFavourite.TableName} WHERE nodeKey = @0",
            nodeKey);
        scope.Complete();
    }

    public void UpdateSortOrder(Guid userKey, IEnumerable<Guid> nodeKeys)
    {
        using var scope = _scopeProvider.CreateScope();
        var sortOrder = 0;
        foreach (var nodeKey in nodeKeys)
        {
            scope.Database.Execute(
                $"UPDATE {CorkFavourite.TableName} SET sortOrder = @0 WHERE userKey = @1 AND nodeKey = @2",
                sortOrder, userKey, nodeKey);
            sortOrder++;
        }
        scope.Complete();
    }
}
