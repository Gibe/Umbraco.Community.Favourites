export const manifests: Array<UmbExtensionManifest> = [
  {
    name: "Umbraco.Favourites Entrypoint",
    alias: "UmbracoFavourites.Entrypoint",
    type: "backofficeEntryPoint",
    js: () => import("./entrypoint.js"),
  },
];
