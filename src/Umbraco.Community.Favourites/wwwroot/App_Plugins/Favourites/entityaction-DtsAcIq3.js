import { t as e } from "./client.gen-BqX9kGvI.js";
import { UmbEntityActionBase as t } from "@umbraco-cms/backoffice/entity-action";
import { UMB_NOTIFICATION_CONTEXT as n } from "@umbraco-cms/backoffice/notification";
//#region src/entityactions/entityaction.ts
var r = class extends t {
	#e;
	constructor(e, t) {
		super(e, t), this.consumeContext(n, (e) => {
			this.#e = e;
		});
	}
	async execute() {
		let { error: t } = await e.post({
			url: "/umbraco/favourites/api/v1/favourites",
			body: { nodeKey: this.args.unique },
			security: [{
				scheme: "bearer",
				type: "http"
			}]
		});
		t ? this.#e?.peek("danger", { data: {
			headline: "Failed to add favourite",
			message: ""
		} }) : (this.#e?.peek("positive", { data: {
			headline: "Added to favourites",
			message: ""
		} }), window.dispatchEvent(new CustomEvent("favourites-updated")));
	}
};
//#endregion
export { r as default };

//# sourceMappingURL=entityaction-DtsAcIq3.js.map