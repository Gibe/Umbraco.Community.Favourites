import { FAVOURITES_USE_PERMISSION_VERB } from "./constants.js";

export const manifests: Array<UmbExtensionManifest> = [
  {
    type: "entityUserPermission",
    alias: "Favourites.EntityUserPermission.Use",
    name: "Favourites Use Permission",
    forEntityTypes: ["document"],
    meta: {
      verbs: [FAVOURITES_USE_PERMISSION_VERB],
      label: "Favourites",
      description: "Allow the user to add, remove and view their favourites",
    },
  },
];
