import { UmbWorkspaceActionBase as o } from "@umbraco-cms/backoffice/workspace";
import { UMB_NOTIFICATION_CONTEXT as r } from "@umbraco-cms/backoffice/notification";
import { UMB_DOCUMENT_WORKSPACE_CONTEXT as n } from "@umbraco-cms/backoffice/document";
import { c as i } from "./client.gen-Ce7o8kG8.js";
class v extends o {
  #e;
  #t;
  constructor(e, s) {
    super(e, s), this.consumeContext(r, (t) => {
      this.#e = t;
    }), this.consumeContext(n, (t) => {
      this.#t = t;
    });
  }
  async execute() {
    const e = this.#t?.getUnique();
    if (!e) {
      this.#e?.peek("warning", {
        data: { headline: "Save document first", message: "You cannot pin an unsaved document." }
      });
      return;
    }
    const { data: s, error: t } = await i.get({
      url: "/umbraco/favourites/api/v1/favourites",
      security: [{ scheme: "bearer", type: "http" }]
    });
    if (t) {
      this.#e?.peek("danger", {
        data: { headline: "Failed to check pin status", message: "" }
      });
      return;
    }
    if ((s ?? []).some((a) => a.nodeKey === e)) {
      const { error: a } = await i.delete({
        url: "/umbraco/favourites/api/v1/favourites/{nodeKey}",
        path: { nodeKey: e },
        security: [{ scheme: "bearer", type: "http" }]
      });
      a ? this.#e?.peek("danger", {
        data: { headline: "Failed to unpin node", message: "" }
      }) : (this.#e?.peek("positive", {
        data: { headline: "Removed from favourites", message: "" }
      }), window.dispatchEvent(new CustomEvent("umbraco-favourites-updated")));
    } else {
      const { error: a } = await i.post({
        url: "/umbraco/favourites/api/v1/favourites",
        body: { nodeKey: e },
        security: [{ scheme: "bearer", type: "http" }]
      });
      a ? this.#e?.peek("danger", {
        data: { headline: "Failed to pin node", message: "" }
      }) : (this.#e?.peek("positive", {
        data: { headline: "Added to favourites", message: "" }
      }), window.dispatchEvent(new CustomEvent("umbraco-favourites-updated")));
    }
  }
}
export {
  v as default
};
//# sourceMappingURL=workspaceaction.action-CeOnblGC.js.map
