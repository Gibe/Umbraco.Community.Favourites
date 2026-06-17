import { t as e } from "./client.gen-BqX9kGvI.js";
import { UmbEntityActionBase as t } from "@umbraco-cms/backoffice/entity-action";
import { UMB_NOTIFICATION_CONTEXT as n } from "@umbraco-cms/backoffice/notification";
//#region src/entityactions/unfavourite-entityaction.ts
var r = class extends t {
	#e;
	constructor(e, t) {
		super(e, t), this.consumeContext(n, (e) => {
			this.#e = e;
		});
	}
	async execute() {
		let t = this.args.unique;
		if (!t) return;
		let { error: n } = await e.delete({
			url: "/umbraco/favourites/api/v1/favourites/{nodeKey}",
			path: { nodeKey: t },
			security: [{
				scheme: "bearer",
				type: "http"
			}]
		});
		n ? this.#e?.peek("danger", { data: {
			headline: "Failed to remove favourite",
			message: ""
		} }) : (this.#e?.peek("positive", { data: {
			headline: "Removed from favourites",
			message: ""
		} }), window.dispatchEvent(new CustomEvent("favourites-updated")));
	}
};
//#endregion
export { r as default };

//# sourceMappingURL=unfavourite-entityaction-DVNi5Ve5.js.map