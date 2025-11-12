export const manifests: Array<UmbExtensionManifest> = [
  {
    name: "cork",
    alias: "cork.sidebar.app",
    type: "sectionSidebarApp",
    kind: "menu",
    meta: {
      label: "Pins",
      menu: "cork.menu",
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
