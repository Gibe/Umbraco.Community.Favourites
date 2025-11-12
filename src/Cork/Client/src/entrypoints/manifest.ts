export const manifests: Array<UmbExtensionManifest> = [
  {
    name: "Cork Entrypoint",
    alias: "Cork.Entrypoint",
    type: "backofficeEntryPoint",
    js: () => import("./entrypoint.js"),
  },
];
