import { UmbEntityActionBase as i } from "@umbraco-cms/backoffice/entity-action";
import { UMB_NOTIFICATION_CONTEXT as a } from "@umbraco-cms/backoffice/notification";
import { c as o } from "./client.gen-Ce7o8kG8.js";
class u extends i {
  #e;
  constructor(e, t) {
    super(e, t), this.consumeContext(a, (s) => {
      this.#e = s;
    });
  }
  async execute() {
    const { error: e } = await o.post({
      url: "/umbraco/cork/api/v1/favourites",
      body: { nodeKey: this.args.unique },
      security: [{ scheme: "bearer", type: "http" }]
    });
    e ? this.#e?.peek("danger", {
      data: { headline: "Failed to add favourite", message: "This message is a test" }
    }) : (this.#e?.peek("positive", {
      data: { headline: "Added to favourites", message: "This message is a test" }
    }), window.dispatchEvent(new CustomEvent("cork-favourites-updated")));
  }
}
export {
  u as default
};
//# sourceMappingURL=entityaction-QXo5g7OS.js.map
