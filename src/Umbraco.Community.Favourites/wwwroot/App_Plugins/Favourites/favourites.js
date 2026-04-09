const i = [
  {
    name: "Favourites Entrypoint",
    alias: "Favourites.Entrypoint",
    type: "backofficeEntryPoint",
    js: () => import("./entrypoint-D09Tm1TN.js")
  }
], t = [
  {
    name: "Favourites Sidebar App",
    alias: "Favourites.Sidebar.App",
    type: "sectionSidebarApp",
    kind: "menuWithEntityActions",
    meta: {
      menu: "Favourites.Menu"
    },
    element: () => import("./sidebar.element-DUmUeE5K.js"),
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
    name: "Favourites Sidebar Menu",
    alias: "Favourites.Menu",
    type: "menu",
    meta: {
      label: "Favourites"
    }
  }
], n = [
  {
    name: "Favourites Menu Item",
    alias: "Favourites.Menu.Item",
    type: "menuItem",
    element: () => import("./pins.element-lzBHntWt.js"),
    meta: {
      label: "Favourites",
      icon: "icon-pin",
      entityType: "",
      menus: [
        "Favourites.Menu"
      ]
    }
  }
], e = [
  {
    name: "Favourites Favourite Entity Action",
    alias: "Favourites.EntityAction.Favourite",
    type: "entityAction",
    kind: "default",
    weight: 10,
    api: () => import("./entityaction-CZLR6bu-.js"),
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
        alias: "Favourites.Condition.IsNotFavourited"
      }
    ]
  },
  {
    name: "Favourites Unfavourite Entity Action",
    alias: "Favourites.EntityAction.Unfavourite",
    type: "entityAction",
    kind: "default",
    weight: 10,
    api: () => import("./unfavourite-entityaction-CvkhEtqz.js"),
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
        alias: "Favourites.Condition.IsFavourited"
      }
    ]
  }
], a = "Favourites.Condition.HasFavourites", s = "Favourites.Condition.IsFavourited", r = "Favourites.Condition.IsNotFavourited", u = [
  {
    name: "Favourites Has Favourites Condition",
    alias: a,
    type: "condition",
    api: () => import("./has-favourites.condition-D61ye5f9.js")
  },
  {
    name: "Favourites Is Favourited Condition",
    alias: s,
    type: "condition",
    api: () => import("./is-favourited.condition-Di0CF02l.js")
  },
  {
    name: "Favourites Is Not Favourited Condition",
    alias: r,
    type: "condition",
    api: () => import("./is-not-favourited.condition-CUC9ARz8.js")
  }
], m = [
  {
    type: "workspaceAction",
    alias: "Favourites.WorkspaceAction.Pin",
    name: "Favourites Pin Workspace Action",
    api: () => import("./workspaceaction.action-D_bgC1bj.js"),
    element: () => import("./workspaceaction.element-BUrpJchJ.js"),
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
], c = [
  ...i,
  ...t,
  ...o,
  ...n,
  ...e,
  ...u,
  ...m
];
export {
  c as manifests
};
//# sourceMappingURL=favourites.js.map
