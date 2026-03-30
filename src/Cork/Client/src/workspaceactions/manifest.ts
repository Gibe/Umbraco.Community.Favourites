export const manifests: Array<UmbExtensionManifest> = [
  {
    type: "workspaceAction",
    alias: "Cork.WorkspaceAction.Pin",
    name: "Cork Pin Workspace Action",
    api: () => import("./workspaceaction.action.js"),
    element: () => import("./workspaceaction.element.js"),
    weight: 95,
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
