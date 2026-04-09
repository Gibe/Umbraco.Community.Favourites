import { UmbConditionBase as r } from "@umbraco-cms/backoffice/extension-registry";
import { c as s } from "./client.gen-Ce7o8kG8.js";
class u extends r {
  constructor(e, t) {
    super(e, t), this._boundRefresh = () => this._checkFavourites(), this._checkFavourites(), window.addEventListener("favourites-updated", this._boundRefresh);
  }
  async _checkFavourites() {
    const { data: e, error: t } = await s.get({
      url: "/umbraco/favourites/api/v1/favourites",
      security: [{ scheme: "bearer", type: "http" }]
    });
    this.permitted = !t && Array.isArray(e) && e.length > 0;
  }
  destroy() {
    window.removeEventListener("favourites-updated", this._boundRefresh), super.destroy();
  }
}
export {
  u as default
};
//# sourceMappingURL=has-favourites.condition-D61ye5f9.js.map
