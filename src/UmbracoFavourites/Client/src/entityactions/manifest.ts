export const manifests: Array<UmbExtensionManifest> = [
  {
    name: "Umbraco.Favourites Favourite Entity Action",
    alias: "UmbracoFavourites.EntityAction.Favourite",
    type: "entityAction",
    kind: "default",
    weight: 10,
    api: () => import('./entityaction.js'),
    forEntityTypes: ['document'],
    meta: {
      label: "Favourite",
      icon: 'icon-pushpin',
    },
    conditions: [
      {
        alias: "Umb.Condition.EntityIsNotTrashed",
      },
      {
        alias: "UmbracoFavourites.Condition.IsNotFavourited",
      },
    ],
  },
  {
    name: "Umbraco.Favourites Unfavourite Entity Action",
    alias: "UmbracoFavourites.EntityAction.Unfavourite",
    type: "entityAction",
    kind: "default",
    weight: 10,
    api: () => import('./unfavourite-entityaction.js'),
    forEntityTypes: ['document'],
    meta: {
      label: "Unfavourite",
      icon: 'icon-pushpin',
    },
    conditions: [
      {
        alias: "Umb.Condition.EntityIsNotTrashed",
      },
      {
        alias: "UmbracoFavourites.Condition.IsFavourited",
      },
    ],
  },
];
