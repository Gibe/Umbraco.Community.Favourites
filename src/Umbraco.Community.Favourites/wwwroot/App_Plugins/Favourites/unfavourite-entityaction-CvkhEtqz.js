import { UmbEntityActionBase as o } from "@umbraco-cms/backoffice/entity-action";
import { UMB_NOTIFICATION_CONTEXT as a } from "@umbraco-cms/backoffice/notification";
import { c as s } from "./client.gen-Ce7o8kG8.js";
class d extends o {
  #e;
  constructor(e, t) {
    super(e, t), this.consumeContext(a, (i) => {
      this.#e = i;
    });
  }
  async execute() {
    const e = this.args.unique;
    if (!e) return;
    const { error: t } = await s.delete({
      url: "/umbraco/favourites/api/v1/favourites/{nodeKey}",
      path: { nodeKey: e },
      security: [{ scheme: "bearer", type: "http" }]
    });
    t ? this.#e?.peek("danger", {
      data: { headline: "Failed to remove favourite", message: "" }
    }) : (this.#e?.peek("positive", {
      data: { headline: "Removed from favourites", message: "" }
    }), window.dispatchEvent(new CustomEvent("favourites-updated")));
  }
}
export {
  d as default
};
//# sourceMappingURL=unfavourite-entityaction-CvkhEtqz.js.map
