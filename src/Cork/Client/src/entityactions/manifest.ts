export const manifests: Array<UmbExtensionManifest> = [
  {
    name: "Cork Favourite Entity Action",
    alias: "Cork.EntityAction.Favourite",
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
        alias: "Cork.Condition.IsNotFavourited",
      },
    ],
  },
  {
    name: "Cork Unfavourite Entity Action",
    alias: "Cork.EntityAction.Unfavourite",
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
        alias: "Cork.Condition.IsFavourited",
      },
    ],
  },
];
