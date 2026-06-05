using Asp.Versioning;
using Favourites.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Umbraco.Cms.Core.Security;
using Umbraco.Cms.Core.Services;

namespace Favourites.Controllers;

[ApiVersion("1.0")]
[ApiExplorerSettings(GroupName = "Favourites")]
public class FavouritesApiController : FavouritesApiControllerBase
{
    private readonly IFavouritesRepository _favouritesRepository;
    private readonly IBackOfficeSecurityAccessor _backOfficeSecurityAccessor;
    private readonly IContentService _contentService;

    public FavouritesApiController(
        IFavouritesRepository favouritesRepository,
        IBackOfficeSecurityAccessor backOfficeSecurityAccessor,
        IContentService contentService)
    {
        _favouritesRepository = favouritesRepository;
        _backOfficeSecurityAccessor = backOfficeSecurityAccessor;
        _contentService = contentService;
    }

    private Guid GetCurrentUserKey()
    {
        var user = _backOfficeSecurityAccessor.BackOfficeSecurity?.CurrentUser;
        return user?.Key ?? throw new UnauthorizedAccessException("User not authenticated");
    }

    [HttpGet("favourites")]
    [ProducesResponseType<IEnumerable<FavouriteResponse>>(StatusCodes.Status200OK)]
    public IActionResult GetFavourites()
    {
        var userKey = GetCurrentUserKey();
        var favourites = _favouritesRepository.GetFavourites(userKey);

        var results = favourites
            .Select(f =>
            {
                var content = _contentService.GetById(f.NodeKey);
                return content != null
                    ? new FavouriteResponse { NodeKey = f.NodeKey, NodeName = content.Name ?? "Untitled", Published = content.Published }
                    : null;
            })
            .Where(f => f != null)
            .ToList();

        return Ok(results);
    }

    [HttpPost("favourites")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public IActionResult AddFavourite([FromBody] AddFavouriteRequest request)
    {
        var userKey = GetCurrentUserKey();
        _favouritesRepository.AddFavourite(userKey, request.NodeKey);
        return Ok();
    }

    [HttpDelete("favourites/{nodeKey:guid}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public IActionResult RemoveFavourite(Guid nodeKey)
    {
        var userKey = GetCurrentUserKey();
        _favouritesRepository.RemoveFavourite(userKey, nodeKey);
        return Ok();
    }

    [HttpPut("favourites/sort")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public IActionResult SortFavourites([FromBody] SortFavouritesRequest request)
    {
        var userKey = GetCurrentUserKey();
        _favouritesRepository.UpdateSortOrder(userKey, request.NodeKeys);
        return Ok();
    }
}

public class AddFavouriteRequest
{
    public Guid NodeKey { get; set; }
}

public class FavouriteResponse
{
    public Guid NodeKey { get; set; }
    public string NodeName { get; set; } = string.Empty;
    public bool Published { get; set; }
}

public class SortFavouritesRequest
{
    public List<Guid> NodeKeys { get; set; } = [];
}
