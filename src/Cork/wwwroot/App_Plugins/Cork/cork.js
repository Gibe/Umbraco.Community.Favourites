const t = [
  {
    name: "Cork Entrypoint",
    alias: "Cork.Entrypoint",
    type: "backofficeEntryPoint",
    js: () => import("./entrypoint-CkOuTyHN.js")
  }
], n = [
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
      label: "Favourites",
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
], a = [
  {
    type: "menu",
    alias: "cork.menu",
    name: "cork sidebar menu",
    meta: {
      label: "Favourites"
    }
  }
], i = [
  {
    type: "menuItem",
    alias: "cork.menu.item",
    name: "cork pin item",
    meta: {
      label: "Favourites",
      icon: "icon-pin",
      entityType: "",
      menus: [
        "cork.menu"
      ]
    }
  }
], o = [
  {
    name: "Cork Entity Action",
    alias: "Cork.EntityAction",
    type: "entityAction",
    kind: "default",
    weight: 10,
    api: () => import("./entityaction-QXo5g7OS.js"),
    forEntityTypes: ["document"],
    meta: {
      label: "Favourite",
      icon: "icon-star"
    }
  }
], s = [
  ...t,
  ...n,
  ...e,
  ...a,
  ...i,
  ...o
];
export {
  s as manifests
};
//# sourceMappingURL=cork.js.map
