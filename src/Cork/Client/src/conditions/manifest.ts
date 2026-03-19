import { HAS_FAVOURITES_CONDITION_ALIAS } from "./constants.js";

export const manifests: Array<UmbExtensionManifest> = [
  {
    name: "Cork Has Favourites Condition",
    alias: HAS_FAVOURITES_CONDITION_ALIAS,
    type: "condition",
    api: () => import("./has-favourites.condition.js"),
  },
];
