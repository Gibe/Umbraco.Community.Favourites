import { UmbConditionBase as r } from "@umbraco-cms/backoffice/extension-registry";
import { c as s } from "./client.gen-Ce7o8kG8.js";
class c extends r {
  constructor(e, t) {
    super(e, t), this._boundRefresh = () => this._checkFavourites(), this._checkFavourites(), window.addEventListener("cork-favourites-updated", this._boundRefresh);
  }
  async _checkFavourites() {
    const { data: e, error: t } = await s.get({
      url: "/umbraco/cork/api/v1/favourites",
      security: [{ scheme: "bearer", type: "http" }]
    });
    this.permitted = !t && Array.isArray(e) && e.length > 0;
  }
  destroy() {
    window.removeEventListener("cork-favourites-updated", this._boundRefresh), super.destroy();
  }
}
export {
  c as default
};
//# sourceMappingURL=has-favourites.condition-Jw3ov3l5.js.map
