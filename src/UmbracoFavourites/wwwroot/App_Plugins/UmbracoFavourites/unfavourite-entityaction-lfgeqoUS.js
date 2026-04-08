import { UmbEntityActionBase as i } from "@umbraco-cms/backoffice/entity-action";
import { UMB_NOTIFICATION_CONTEXT as a } from "@umbraco-cms/backoffice/notification";
import { c as r } from "./client.gen-Ce7o8kG8.js";
class m extends i {
  #e;
  constructor(e, t) {
    super(e, t), this.consumeContext(a, (o) => {
      this.#e = o;
    });
  }
  async execute() {
    const e = this.args.unique;
    if (!e) return;
    const { error: t } = await r.delete({
      url: "/umbraco/favourites/api/v1/favourites/{nodeKey}",
      path: { nodeKey: e },
      security: [{ scheme: "bearer", type: "http" }]
    });
    t ? this.#e?.peek("danger", {
      data: { headline: "Failed to remove favourite", message: "" }
    }) : (this.#e?.peek("positive", {
      data: { headline: "Removed from favourites", message: "" }
    }), window.dispatchEvent(new CustomEvent("umbraco-favourites-updated")));
  }
}
export {
  m as default
};
//# sourceMappingURL=unfavourite-entityaction-lfgeqoUS.js.map
