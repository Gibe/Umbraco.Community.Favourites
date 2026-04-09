using Favourites.Models;
using Umbraco.Cms.Infrastructure.Scoping;

namespace Favourites.Repositories;

public interface IFavouritesRepository
{
    IEnumerable<Favourite> GetFavourites(Guid userKey);
    void AddFavourite(Guid userKey, Guid nodeKey);
    void RemoveFavourite(Guid userKey, Guid nodeKey);
    void RemoveFavouritesByNodeKey(Guid nodeKey);
    void UpdateSortOrder(Guid userKey, IEnumerable<Guid> nodeKeys);
}

public class FavouritesRepository : IFavouritesRepository
{
    private readonly IScopeProvider _scopeProvider;

    public FavouritesRepository(IScopeProvider scopeProvider)
    {
        _scopeProvider = scopeProvider;
    }

    public IEnumerable<Favourite> GetFavourites(Guid userKey)
    {
        using var scope = _scopeProvider.CreateScope();
        var results = scope.Database.Fetch<Favourite>(
            "WHERE userKey = @0 ORDER BY sortOrder", userKey);
        scope.Complete();
        return results;
    }

    public void AddFavourite(Guid userKey, Guid nodeKey)
    {
        using var scope = _scopeProvider.CreateScope();
        var existing = scope.Database.FirstOrDefault<Favourite>(
            "WHERE userKey = @0 AND nodeKey = @1", userKey, nodeKey);

        if (existing == null)
        {
            var maxSortOrder = scope.Database.ExecuteScalar<int>(
                $"SELECT COALESCE(MAX(sortOrder), -1) FROM {Favourite.TableName} WHERE userKey = @0", userKey);

            scope.Database.Insert(new Favourite
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
            $"DELETE FROM {Favourite.TableName} WHERE userKey = @0 AND nodeKey = @1",
            userKey, nodeKey);
        scope.Complete();
    }

    public void RemoveFavouritesByNodeKey(Guid nodeKey)
    {
        using var scope = _scopeProvider.CreateScope();
        scope.Database.Execute(
            $"DELETE FROM {Favourite.TableName} WHERE nodeKey = @0",
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
                $"UPDATE {Favourite.TableName} SET sortOrder = @0 WHERE userKey = @1 AND nodeKey = @2",
                sortOrder, userKey, nodeKey);
            sortOrder++;
        }
        scope.Complete();
    }
}
