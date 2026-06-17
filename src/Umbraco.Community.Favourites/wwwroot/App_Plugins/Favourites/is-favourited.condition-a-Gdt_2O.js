import { t as e } from "./check-is-favourited-CjVFEwkq.js";
import { UmbConditionBase as t } from "@umbraco-cms/backoffice/extension-registry";
import { UMB_ENTITY_CONTEXT as n } from "@umbraco-cms/backoffice/entity";
//#region src/conditions/is-favourited.condition.ts
var r = class extends t {
	constructor(e, t) {
		super(e, t), this._entityUnique = null, this._boundRefresh = () => this._evaluate(), this.consumeContext(n, (e) => {
			e && (this._entityUnique = e.getUnique() ?? null, this._evaluate());
		}), window.addEventListener("favourites-updated", this._boundRefresh);
	}
	async _evaluate() {
		this.permitted = await e(this._entityUnique);
	}
	destroy() {
		window.removeEventListener("favourites-updated", this._boundRefresh), super.destroy();
	}
};
//#endregion
export { r as default };

//# sourceMappingURL=is-favourited.condition-a-Gdt_2O.js.map