import { UmbConditionBase } from "@umbraco-cms/backoffice/extension-registry";
import { UMB_CURRENT_USER_CONTEXT } from "@umbraco-cms/backoffice/current-user";
import type {
  UmbConditionConfigBase,
  UmbConditionControllerArguments,
  UmbExtensionCondition,
} from "@umbraco-cms/backoffice/extension-api";
import type { UmbControllerHost } from "@umbraco-cms/backoffice/controller-api";
import { HAS_PERMISSION_CONDITION_ALIAS } from "./constants.js";
import { FAVOURITES_USE_PERMISSION_VERB } from "../permissions/constants.js";

export type HasPermissionConditionConfig = UmbConditionConfigBase<typeof HAS_PERMISSION_CONDITION_ALIAS>;

// UX only - the API enforces the same permission server side
export default class HasPermissionCondition
  extends UmbConditionBase<HasPermissionConditionConfig>
  implements UmbExtensionCondition
{
  constructor(
    host: UmbControllerHost,
    args: UmbConditionControllerArguments<HasPermissionConditionConfig>,
  ) {
    super(host, args);

    this.consumeContext(UMB_CURRENT_USER_CONTEXT, (context) => {
      this.observe(context?.fallbackPermissions, (permissions) => {
        this.permitted = permissions?.includes(FAVOURITES_USE_PERMISSION_VERB) ?? false;
      });
    });
  }
}
