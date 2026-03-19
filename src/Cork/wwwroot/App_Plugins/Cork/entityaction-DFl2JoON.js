import { UmbEntityActionBase as i } from "@umbraco-cms/backoffice/entity-action";
import { UMB_NOTIFICATION_CONTEXT as a } from "@umbraco-cms/backoffice/notification";
import { c as s } from "./bundle.manifests-6hy1jyEL.js";
class u extends i {
  #e;
  constructor(e, t) {
    super(e, t), this.consumeContext(a, (o) => {
      this.#e = o;
    });
  }
  async execute() {
    const { error: e } = await s.post({
      url: "/umbraco/cork/api/v1/favourites",
      body: { nodeKey: this.args.unique },
      security: [{ scheme: "bearer", type: "http" }]
    });
    e ? this.#e?.peek("danger", {
      data: { headline: "Failed to add favourite", message: "" }
    }) : (this.#e?.peek("positive", {
      data: { headline: "Added to favourites", message: "" }
    }), window.dispatchEvent(new CustomEvent("cork-favourites-updated")));
  }
}
export {
  u as default
};
//# sourceMappingURL=entityaction-DFl2JoON.js.map
