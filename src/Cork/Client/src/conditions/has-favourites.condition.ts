import { UmbConditionBase } from "@umbraco-cms/backoffice/extension-registry";
import type {
  UmbConditionConfigBase,
  UmbConditionControllerArguments,
  UmbExtensionCondition,
} from "@umbraco-cms/backoffice/extension-api";
import type { UmbControllerHost } from "@umbraco-cms/backoffice/controller-api";
import { client } from "../api/client.gen.js";
import { HAS_FAVOURITES_CONDITION_ALIAS } from "./constants.js";

export type HasFavouritesConditionConfig = UmbConditionConfigBase<typeof HAS_FAVOURITES_CONDITION_ALIAS>;

export default class HasFavouritesCondition
  extends UmbConditionBase<HasFavouritesConditionConfig>
  implements UmbExtensionCondition
{
  private _boundRefresh = () => this._checkFavourites();

  constructor(
    host: UmbControllerHost,
    args: UmbConditionControllerArguments<HasFavouritesConditionConfig>,
  ) {
    super(host, args);
    this._checkFavourites();
    window.addEventListener("cork-favourites-updated", this._boundRefresh);
  }

  private async _checkFavourites() {
    const { data, error } = await client.get({
      url: "/umbraco/cork/api/v1/favourites",
      security: [{ scheme: "bearer", type: "http" }],
    });

    this.permitted = !error && Array.isArray(data) && data.length > 0;
  }

  override destroy() {
    window.removeEventListener("cork-favourites-updated", this._boundRefresh);
    super.destroy();
  }
}
