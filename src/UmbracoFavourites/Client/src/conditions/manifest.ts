import {
  HAS_FAVOURITES_CONDITION_ALIAS,
  IS_FAVOURITED_CONDITION_ALIAS,
  IS_NOT_FAVOURITED_CONDITION_ALIAS,
} from "./constants.js";

export const manifests: Array<UmbExtensionManifest> = [
  {
    name: "Umbraco.Favourites Has Favourites Condition",
    alias: HAS_FAVOURITES_CONDITION_ALIAS,
    type: "condition",
    api: () => import("./has-favourites.condition.js"),
  },
  {
    name: "Umbraco.Favourites Is Favourited Condition",
    alias: IS_FAVOURITED_CONDITION_ALIAS,
    type: "condition",
    api: () => import("./is-favourited.condition.js"),
  },
  {
    name: "Umbraco.Favourites Is Not Favourited Condition",
    alias: IS_NOT_FAVOURITED_CONDITION_ALIAS,
    type: "condition",
    api: () => import("./is-not-favourited.condition.js"),
  },
];
