import { UmbConditionBase as s } from "@umbraco-cms/backoffice/extension-registry";
import { UMB_ENTITY_CONTEXT as n } from "@umbraco-cms/backoffice/entity";
import { c as o } from "./check-is-favourited-5JDVPRfq.js";
class h extends s {
  constructor(t, i) {
    super(t, i), this._entityUnique = null, this._boundRefresh = () => this._evaluate(), this.consumeContext(n, (e) => {
      e && (this._entityUnique = e.getUnique() ?? null, this._evaluate());
    }), window.addEventListener("favourites-updated", this._boundRefresh);
  }
  async _evaluate() {
    this.permitted = await o(this._entityUnique);
  }
  destroy() {
    window.removeEventListener("favourites-updated", this._boundRefresh), super.destroy();
  }
}
export {
  h as default
};
//# sourceMappingURL=is-favourited.condition-Di0CF02l.js.map
