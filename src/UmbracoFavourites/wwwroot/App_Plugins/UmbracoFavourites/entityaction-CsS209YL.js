import { UmbEntityActionBase as a } from "@umbraco-cms/backoffice/entity-action";
import { UMB_NOTIFICATION_CONTEXT as i } from "@umbraco-cms/backoffice/notification";
import { c as s } from "./client.gen-Ce7o8kG8.js";
class c extends a {
  #e;
  constructor(e, t) {
    super(e, t), this.consumeContext(i, (o) => {
      this.#e = o;
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
    }), window.dispatchEvent(new CustomEvent("umbraco-favourites-updated")));
  }
}
export {
  c as default
};
//# sourceMappingURL=entityaction-CsS209YL.js.map
