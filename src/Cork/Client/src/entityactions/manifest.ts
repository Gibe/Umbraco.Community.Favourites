export const manifests: Array<UmbExtensionManifest> = [
  {
    name: "Cork Entity Action",
    alias: "Cork.EntityAction",
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
    ],
  },
];
