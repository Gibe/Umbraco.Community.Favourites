import { UmbConditionBase } from "@umbraco-cms/backoffice/extension-registry";
import type {
  UmbConditionConfigBase,
  UmbConditionControllerArguments,
  UmbExtensionCondition,
} from "@umbraco-cms/backoffice/extension-api";
import type { UmbControllerHost } from "@umbraco-cms/backoffice/controller-api";
import { UMB_ENTITY_CONTEXT } from "@umbraco-cms/backoffice/entity";
import { checkIsFavourited } from "./check-is-favourited.js";
import { IS_NOT_FAVOURITED_CONDITION_ALIAS } from "./constants.js";

export type IsNotFavouritedConditionConfig =
  UmbConditionConfigBase<typeof IS_NOT_FAVOURITED_CONDITION_ALIAS>;

export default class IsNotFavouritedCondition
  extends UmbConditionBase<IsNotFavouritedConditionConfig>
  implements UmbExtensionCondition
{
  private _entityUnique: string | null = null;
  private _boundRefresh = () => this._evaluate();

  constructor(
    host: UmbControllerHost,
    args: UmbConditionControllerArguments<IsNotFavouritedConditionConfig>,
  ) {
    super(host, args);

    this.consumeContext(UMB_ENTITY_CONTEXT, (ctx) => {
      if (ctx) {
        this._entityUnique = ctx.getUnique() ?? null;
        this._evaluate();
      }
    });

    window.addEventListener("favourites-updated", this._boundRefresh);
  }

  private async _evaluate() {
    this.permitted = !(await checkIsFavourited(this._entityUnique));
  }

  override destroy() {
    window.removeEventListener("favourites-updated", this._boundRefresh);
    super.destroy();
  }
}
