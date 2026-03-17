const t = [
  {
    name: "Cork Entrypoint",
    alias: "Cork.Entrypoint",
    type: "backofficeEntryPoint",
    js: () => import("./entrypoint-D09Tm1TN.js")
  }
], n = [
  {
    name: "Cork Sidebar App",
    alias: "Cork.Sidebar.App",
    type: "sectionSidebarApp",
    kind: "menuWithEntityActions",
    meta: {
      label: "Favourites",
      menu: "Cork.Menu"
    },
    weight: 999999,
    conditions: [
      {
        alias: "Umb.Condition.SectionAlias",
        match: "Umb.Section.Content"
      }
    ]
  }
], e = [
  {
    name: "Cork Sidebar Menu",
    alias: "Cork.Menu",
    type: "menu",
    meta: {
      label: "Favourites"
    }
  }
], i = [
  {
    name: "Cork Menu Item",
    alias: "Cork.Menu.Item",
    type: "menuItem",
    element: () => import("./pins.element-CVUq8c3M.js"),
    meta: {
      label: "Favourites",
      icon: "icon-pin",
      entityType: "",
      menus: [
        "Cork.Menu"
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
    api: () => import("./entityaction-D8oaJ4nN.js"),
    forEntityTypes: ["document"],
    meta: {
      label: "Favourite",
      icon: "icon-pushpin"
    },
    conditions: [
      {
        alias: "Umb.Condition.EntityIsNotTrashed"
      }
    ]
  }
], a = [
  ...t,
  ...n,
  ...e,
  ...i,
  ...o
];
export {
  a as manifests
};
//# sourceMappingURL=cork.js.map
