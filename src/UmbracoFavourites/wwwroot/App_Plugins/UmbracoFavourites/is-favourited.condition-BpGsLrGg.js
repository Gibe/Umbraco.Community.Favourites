import { UmbConditionBase as s } from "@umbraco-cms/backoffice/extension-registry";
import { UMB_ENTITY_CONTEXT as o } from "@umbraco-cms/backoffice/entity";
import { c as n } from "./check-is-favourited-5JDVPRfq.js";
class h extends s {
  constructor(t, i) {
    super(t, i), this._entityUnique = null, this._boundRefresh = () => this._evaluate(), this.consumeContext(o, (e) => {
      e && (this._entityUnique = e.getUnique() ?? null, this._evaluate());
    }), window.addEventListener("umbraco-favourites-updated", this._boundRefresh);
  }
  async _evaluate() {
    this.permitted = await n(this._entityUnique);
  }
  destroy() {
    window.removeEventListener("umbraco-favourites-updated", this._boundRefresh), super.destroy();
  }
}
export {
  h as default
};
//# sourceMappingURL=is-favourited.condition-BpGsLrGg.js.map
