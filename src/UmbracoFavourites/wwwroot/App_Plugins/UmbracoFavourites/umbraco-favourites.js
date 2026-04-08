const i = [
  {
    name: "Umbraco.Favourites Entrypoint",
    alias: "UmbracoFavourites.Entrypoint",
    type: "backofficeEntryPoint",
    js: () => import("./entrypoint-D09Tm1TN.js")
  }
], t = [
  {
    name: "Umbraco.Favourites Sidebar App",
    alias: "UmbracoFavourites.Sidebar.App",
    type: "sectionSidebarApp",
    kind: "menuWithEntityActions",
    meta: {
      menu: "UmbracoFavourites.Menu"
    },
    element: () => import("./sidebar.element-CZJwPaoI.js"),
    weight: 500,
    conditions: [
      {
        alias: "Umb.Condition.SectionAlias",
        match: "Umb.Section.Content"
      }
    ]
  }
], o = [
  {
    name: "Umbraco.Favourites Sidebar Menu",
    alias: "UmbracoFavourites.Menu",
    type: "menu",
    meta: {
      label: "Favourites"
    }
  }
], a = [
  {
    name: "Umbraco.Favourites Menu Item",
    alias: "UmbracoFavourites.Menu.Item",
    type: "menuItem",
    element: () => import("./pins.element-CMxWk5Q0.js"),
    meta: {
      label: "Favourites",
      icon: "icon-pin",
      entityType: "",
      menus: [
        "UmbracoFavourites.Menu"
      ]
    }
  }
], n = [
  {
    name: "Umbraco.Favourites Favourite Entity Action",
    alias: "UmbracoFavourites.EntityAction.Favourite",
    type: "entityAction",
    kind: "default",
    weight: 10,
    api: () => import("./entityaction-CsS209YL.js"),
    forEntityTypes: ["document"],
    meta: {
      label: "Favourite",
      icon: "icon-pushpin"
    },
    conditions: [
      {
        alias: "Umb.Condition.EntityIsNotTrashed"
      },
      {
        alias: "UmbracoFavourites.Condition.IsNotFavourited"
      }
    ]
  },
  {
    name: "Umbraco.Favourites Unfavourite Entity Action",
    alias: "UmbracoFavourites.EntityAction.Unfavourite",
    type: "entityAction",
    kind: "default",
    weight: 10,
    api: () => import("./unfavourite-entityaction-lfgeqoUS.js"),
    forEntityTypes: ["document"],
    meta: {
      label: "Unfavourite",
      icon: "icon-pushpin"
    },
    conditions: [
      {
        alias: "Umb.Condition.EntityIsNotTrashed"
      },
      {
        alias: "UmbracoFavourites.Condition.IsFavourited"
      }
    ]
  }
], e = "UmbracoFavourites.Condition.HasFavourites", s = "UmbracoFavourites.Condition.IsFavourited", r = "UmbracoFavourites.Condition.IsNotFavourited", m = [
  {
    name: "Umbraco.Favourites Has Favourites Condition",
    alias: e,
    type: "condition",
    api: () => import("./has-favourites.condition-CWOQJL8w.js")
  },
  {
    name: "Umbraco.Favourites Is Favourited Condition",
    alias: s,
    type: "condition",
    api: () => import("./is-favourited.condition-BpGsLrGg.js")
  },
  {
    name: "Umbraco.Favourites Is Not Favourited Condition",
    alias: r,
    type: "condition",
    api: () => import("./is-not-favourited.condition-CJXUziCW.js")
  }
], c = [
  {
    type: "workspaceAction",
    alias: "UmbracoFavourites.WorkspaceAction.Pin",
    name: "Umbraco.Favourites Pin Workspace Action",
    api: () => import("./workspaceaction.action-CeOnblGC.js"),
    element: () => import("./workspaceaction.element-DkE8Yi9s.js"),
    weight: 100,
    conditions: [
      {
        alias: "Umb.Condition.WorkspaceAlias",
        match: "Umb.Workspace.Document"
      },
      {
        alias: "Umb.Condition.EntityIsNotTrashed"
      }
    ]
  }
], u = [
  ...i,
  ...t,
  ...o,
  ...a,
  ...n,
  ...m,
  ...c
];
export {
  u as manifests
};
//# sourceMappingURL=umbraco-favourites.js.map
