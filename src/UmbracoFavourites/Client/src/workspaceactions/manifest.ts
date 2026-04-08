export const manifests: Array<UmbExtensionManifest> = [
  {
    type: "workspaceAction",
    alias: "UmbracoFavourites.WorkspaceAction.Pin",
    name: "Umbraco.Favourites Pin Workspace Action",
    api: () => import("./workspaceaction.action.js"),
    element: () => import("./workspaceaction.element.js"),
    weight: 100,
    conditions: [
      {
        alias: "Umb.Condition.WorkspaceAlias",
        match: "Umb.Workspace.Document",
      },
      {
        alias: "Umb.Condition.EntityIsNotTrashed",
      },
    ],
  },
];
