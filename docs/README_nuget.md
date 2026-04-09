# Umbraco.Community.Favourites

[![Downloads](https://img.shields.io/nuget/dt/Umbraco.Community.Favourites?color=cc9900)](https://www.nuget.org/packages/Umbraco.Community.Favourites/)
[![NuGet](https://img.shields.io/nuget/vpre/Umbraco.Community.Favourites?color=0273B3)](https://www.nuget.org/packages/Umbraco.Community.Favourites)
[![GitHub license](https://img.shields.io/github/license/Gibe/Umbraco.Community.Favourites?color=8AB803)](https://github.com/Gibe/Umbraco.Community.Favourites/blob/main/LICENSE)

Umbraco.Community.Favourites is a backoffice extension for Umbraco CMS (v15+) that lets editors pin and quickly navigate to their most-used content items. Favourites are stored per-user in the database and accessible via a dedicated sidebar panel in the Content section.

## Features

- **Pin from the workspace** — a pin button appears in the document workspace toolbar for any non-trashed content item
- **Entity actions** — right-click any content item to Favourite or Unfavourite it from the tree or list view
- **Favourites sidebar** — a sidebar panel in the Content section lists all pinned items with one-click navigation
- **Conditions** — three built-in extension conditions (`Favourites.Condition.HasFavourites`, `Favourites.Condition.IsFavourited`, `Favourites.Condition.IsNotFavourited`) for use in your own extensions

## Requirements

- Umbraco CMS v15+
- .NET 10+

## Installation

```
dotnet add package Umbraco.Community.Favourites
```

No further configuration is required. The package registers itself via an Umbraco composer and runs its database migrations automatically on startup.

## Source & Issues

[https://github.com/Gibe/Umbraco.Community.Favourites](https://github.com/Gibe/Umbraco.Community.Favourites)
