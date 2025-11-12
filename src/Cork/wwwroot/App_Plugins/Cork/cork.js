const n = [
  {
    name: "Cork Entrypoint",
    alias: "Cork.Entrypoint",
    type: "backofficeEntryPoint",
    js: () => import("./entrypoint-CkOuTyHN.js")
  }
], a = [
  {
    name: "Cork Dashboard",
    alias: "Cork.Dashboard",
    type: "dashboard",
    js: () => import("./dashboard.element-CrG1ZR8b.js"),
    meta: {
      label: "Example Dashboard",
      pathname: "example-dashboard"
    },
    conditions: [
      {
        alias: "Umb.Condition.SectionAlias",
        match: "Umb.Section.Content"
      }
    ]
  }
], e = [
  {
    name: "cork",
    alias: "cork.sidebar.app",
    type: "sectionSidebarApp",
    kind: "menu",
    meta: {
      label: "Pins",
      menu: "cork.menu"
    },
    weight: 999999,
    conditions: [
      {
        alias: "Umb.Condition.SectionAlias",
        match: "Umb.Section.Content"
      }
    ]
  }
], t = [
  {
    type: "menu",
    alias: "cork.menu",
    name: "cork sidebar menu",
    meta: {
      label: "Pins"
    }
  }
], i = [
  {
    type: "menuItem",
    alias: "cork.menu.item",
    name: "cork pin item",
    meta: {
      label: "Pin",
      icon: "icon-pin",
      entityType: "",
      menus: [
        "cork.menu"
      ]
    }
  }
], o = [
  ...n,
  ...a,
  ...e,
  ...t,
  ...i
];
export {
  o as manifests
};
//# sourceMappingURL=cork.js.map
