export const manifests: Array<UmbExtensionManifest> = [
  {
    name: "Umbraco.Favourites Sidebar App",
    alias: "UmbracoFavourites.Sidebar.App",
    type: "sectionSidebarApp",
    kind: "menuWithEntityActions",
    meta: {
      menu: "UmbracoFavourites.Menu",
    },
    element: () => import('./sidebar.element'),
    weight: 500,
    conditions: [
      {
        alias: "Umb.Condition.SectionAlias",
        match: "Umb.Section.Content",
      },
    ],
  },
];
