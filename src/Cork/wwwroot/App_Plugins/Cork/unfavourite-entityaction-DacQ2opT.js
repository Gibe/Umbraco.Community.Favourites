import { UmbEntityActionBase as i } from "@umbraco-cms/backoffice/entity-action";
import { UMB_NOTIFICATION_CONTEXT as r } from "@umbraco-cms/backoffice/notification";
import { c as a } from "./client.gen-Ce7o8kG8.js";
class d extends i {
  #e;
  constructor(e, t) {
    super(e, t), this.consumeContext(r, (o) => {
      this.#e = o;
    });
  }
  async execute() {
    const e = this.args.unique;
    if (!e) return;
    const { error: t } = await a.delete({
      url: "/umbraco/cork/api/v1/favourites/{nodeKey}",
      path: { nodeKey: e },
      security: [{ scheme: "bearer", type: "http" }]
    });
    t ? this.#e?.peek("danger", {
      data: { headline: "Failed to remove favourite", message: "" }
    }) : (this.#e?.peek("positive", {
      data: { headline: "Removed from favourites", message: "" }
    }), window.dispatchEvent(new CustomEvent("cork-favourites-updated")));
  }
}
export {
  d as default
};
//# sourceMappingURL=unfavourite-entityaction-DacQ2opT.js.map
