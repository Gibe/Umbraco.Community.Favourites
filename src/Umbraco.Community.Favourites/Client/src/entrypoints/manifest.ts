export const manifests: Array<UmbExtensionManifest> = [
  {
    name: "Favourites Entrypoint",
    alias: "Favourites.Entrypoint",
    type: "backofficeEntryPoint",
    js: () => import("./entrypoint.js"),
  },
];
