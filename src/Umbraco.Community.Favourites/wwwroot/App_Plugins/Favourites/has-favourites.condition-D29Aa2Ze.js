import { t as e } from "./client.gen-BqX9kGvI.js";
import { UmbConditionBase as t } from "@umbraco-cms/backoffice/extension-registry";
//#region src/conditions/has-favourites.condition.ts
var n = class extends t {
	constructor(e, t) {
		super(e, t), this._boundRefresh = () => this._checkFavourites(), this._checkFavourites(), window.addEventListener("favourites-updated", this._boundRefresh);
	}
	async _checkFavourites() {
		let { data: t, error: n } = await e.get({
			url: "/umbraco/favourites/api/v1/favourites",
			security: [{
				scheme: "bearer",
				type: "http"
			}]
		});
		this.permitted = !n && Array.isArray(t) && t.length > 0;
	}
	destroy() {
		window.removeEventListener("favourites-updated", this._boundRefresh), super.destroy();
	}
};
//#endregion
export { n as default };

//# sourceMappingURL=has-favourites.condition-D29Aa2Ze.js.map