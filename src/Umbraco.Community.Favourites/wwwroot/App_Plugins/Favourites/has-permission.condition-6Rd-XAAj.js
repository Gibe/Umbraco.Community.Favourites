import "./constants-DoKlF_Gs.js";
import { UmbConditionBase as e } from "@umbraco-cms/backoffice/extension-registry";
import { UMB_CURRENT_USER_CONTEXT as t } from "@umbraco-cms/backoffice/current-user";
//#region src/conditions/has-permission.condition.ts
var n = class extends e {
	constructor(e, n) {
		super(e, n), this.consumeContext(t, (e) => {
			this.observe(e?.fallbackPermissions, (e) => {
				this.permitted = e?.includes("Favourites.Use") ?? !1;
			});
		});
	}
};
//#endregion
export { n as default };

//# sourceMappingURL=has-permission.condition-6Rd-XAAj.js.map