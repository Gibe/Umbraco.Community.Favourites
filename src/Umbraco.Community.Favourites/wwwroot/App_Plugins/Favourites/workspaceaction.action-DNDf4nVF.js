import { t as e } from "./client.gen-BqX9kGvI.js";
import { UMB_NOTIFICATION_CONTEXT as t } from "@umbraco-cms/backoffice/notification";
import { UmbWorkspaceActionBase as n } from "@umbraco-cms/backoffice/workspace";
import { UMB_DOCUMENT_WORKSPACE_CONTEXT as r } from "@umbraco-cms/backoffice/document";
//#region src/workspaceactions/workspaceaction.action.ts
var i = class extends n {
	#e;
	#t;
	constructor(e, n) {
		super(e, n), this.consumeContext(t, (e) => {
			this.#e = e;
		}), this.consumeContext(r, (e) => {
			this.#t = e;
		});
	}
	async execute() {
		let t = this.#t?.getUnique();
		if (!t) {
			this.#e?.peek("warning", { data: {
				headline: "Save document first",
				message: "You cannot pin an unsaved document."
			} });
			return;
		}
		let { data: n, error: r } = await e.get({
			url: "/umbraco/favourites/api/v1/favourites",
			security: [{
				scheme: "bearer",
				type: "http"
			}]
		});
		if (r) {
			this.#e?.peek("danger", { data: {
				headline: "Failed to check pin status",
				message: ""
			} });
			return;
		}
		if ((n ?? []).some((e) => e.nodeKey === t)) {
			let { error: n } = await e.delete({
				url: "/umbraco/favourites/api/v1/favourites/{nodeKey}",
				path: { nodeKey: t },
				security: [{
					scheme: "bearer",
					type: "http"
				}]
			});
			n ? this.#e?.peek("danger", { data: {
				headline: "Failed to unpin node",
				message: ""
			} }) : (this.#e?.peek("positive", { data: {
				headline: "Removed from favourites",
				message: ""
			} }), window.dispatchEvent(new CustomEvent("favourites-updated")));
		} else {
			let { error: n } = await e.post({
				url: "/umbraco/favourites/api/v1/favourites",
				body: { nodeKey: t },
				security: [{
					scheme: "bearer",
					type: "http"
				}]
			});
			n ? this.#e?.peek("danger", { data: {
				headline: "Failed to pin node",
				message: ""
			} }) : (this.#e?.peek("positive", { data: {
				headline: "Added to favourites",
				message: ""
			} }), window.dispatchEvent(new CustomEvent("favourites-updated")));
		}
	}
};
//#endregion
export { i as default };

//# sourceMappingURL=workspaceaction.action-DNDf4nVF.js.map