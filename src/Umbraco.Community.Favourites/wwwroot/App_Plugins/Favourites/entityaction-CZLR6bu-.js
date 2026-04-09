import { UmbEntityActionBase as o } from "@umbraco-cms/backoffice/entity-action";
import { UMB_NOTIFICATION_CONTEXT as a } from "@umbraco-cms/backoffice/notification";
import { c as s } from "./client.gen-Ce7o8kG8.js";
class c extends o {
  #e;
  constructor(e, t) {
    super(e, t), this.consumeContext(a, (i) => {
      this.#e = i;
    });
  }
  async execute() {
    const { error: e } = await s.post({
      url: "/umbraco/favourites/api/v1/favourites",
      body: { nodeKey: this.args.unique },
      security: [{ scheme: "bearer", type: "http" }]
    });
    e ? this.#e?.peek("danger", {
      data: { headline: "Failed to add favourite", message: "" }
    }) : (this.#e?.peek("positive", {
      data: { headline: "Added to favourites", message: "" }
    }), window.dispatchEvent(new CustomEvent("favourites-updated")));
  }
}
export {
  c as default
};
//# sourceMappingURL=entityaction-CZLR6bu-.js.map
