export const manifests: Array<UmbExtensionManifest> = [
  {
    name: "Cork Sidebar App",
    alias: "Cork.Sidebar.App",
    type: "sectionSidebarApp",
    kind: "menuWithEntityActions",
    meta: {
      label: "Favourites",
      menu: "Cork.Menu",
    },
    weight: 999999,
    conditions: [
      {
        alias: "Umb.Condition.SectionAlias",
        match: "Umb.Section.Content",
      },
    ],
  },
];
