export const manifests: Array<UmbExtensionManifest> = [
  {
    name: "Favourites Sidebar App",
    alias: "Favourites.Sidebar.App",
    type: "sectionSidebarApp",
    kind: "menuWithEntityActions",
    meta: {
      menu: "Favourites.Menu",
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
