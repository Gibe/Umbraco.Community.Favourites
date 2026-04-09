export const manifests: Array<UmbExtensionManifest> = [
  {
    name: "Favourites Favourite Entity Action",
    alias: "Favourites.EntityAction.Favourite",
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
        alias: "Favourites.Condition.IsNotFavourited",
      },
    ],
  },
  {
    name: "Favourites Unfavourite Entity Action",
    alias: "Favourites.EntityAction.Unfavourite",
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
        alias: "Favourites.Condition.IsFavourited",
      },
    ],
  },
];
