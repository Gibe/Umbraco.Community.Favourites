using Microsoft.AspNetCore.Authorization;
using Umbraco.Cms.Core.Security;

namespace Favourites.Authorization;

public class FavouritesPermissionRequirement : IAuthorizationRequirement
{
}

public class FavouritesPermissionHandler : AuthorizationHandler<FavouritesPermissionRequirement>
{
    private readonly IBackOfficeSecurityAccessor _backOfficeSecurityAccessor;

    public FavouritesPermissionHandler(IBackOfficeSecurityAccessor backOfficeSecurityAccessor)
    {
        _backOfficeSecurityAccessor = backOfficeSecurityAccessor;
    }

    protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, FavouritesPermissionRequirement requirement)
    {
        var user = _backOfficeSecurityAccessor.BackOfficeSecurity?.CurrentUser;

        // A user in several groups is allowed if any one of them grants the permission
        if (user is not null && user.Groups.Any(g => g.Permissions?.Contains(Constants.PermissionVerb) == true))
        {
            context.Succeed(requirement);
        }

        return Task.CompletedTask;
    }
}
