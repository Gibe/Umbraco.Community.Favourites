# Umbraco.Community.Favourites

[![Downloads](https://img.shields.io/nuget/dt/Umbraco.Community.Favourites?color=cc9900)](https://www.nuget.org/packages/Umbraco.Community.Favourites/)
[![NuGet](https://img.shields.io/nuget/vpre/Umbraco.Community.Favourites?color=0273B3)](https://www.nuget.org/packages/Umbraco.Community.Favourites)
[![GitHub license](https://img.shields.io/github/license/Gibe/Umbraco.Community.Favourites?color=8AB803)](../LICENSE)

Umbraco.Community.Favourites is a backoffice extension for Umbraco CMS (v15+) that lets editors pin and quickly navigate to their most-used content items. Favourites are stored per-user in the database and accessible via a dedicated sidebar panel in the Content section.

## Features

- **Pin from the workspace** — a pin button appears in the document workspace toolbar for any non-trashed content item, toggling the item in and out of your favourites
- **Entity actions** — right-click any non-trashed content item to Favourite or Unfavourite it directly from the tree or list view
- **Favourites sidebar** — a sidebar panel in the Content section lists all your pinned items with one-click navigation
- **Sorting** — Sort your favourites by simply dragging to rearrange them in the sidebar
- **Conditions** — three built-in extension conditions for use when building your own Umbraco extensions:
  - `Favourites.Condition.HasFavourites` — true when the current user has at least one favourite
  - `Favourites.Condition.IsFavourited` — true when the current entity is in the user's favourites
  - `Favourites.Condition.IsNotFavourited` — true when the current entity is not in the user's favourites

## Requirements

- Umbraco CMS v17+
- .NET 10+

## Installation

Add the package to an existing Umbraco website from NuGet:

```
dotnet add package Umbraco.Community.Favourites
```

No further configuration is required. The package registers itself via an Umbraco composer and runs its database migrations automatically on startup.

## Contributing

Contributions to this package are most welcome! Please read the [Contributing Guidelines](CONTRIBUTING.md).

The solution includes a test site (`Umbraco.Community.Favourites.TestSite`) to make local development easier. It is configured for unattended install — check `appsettings.json` for login details.

## Acknowledgments

Built by [Gibe Digital]((https://gibe.digital/)).
