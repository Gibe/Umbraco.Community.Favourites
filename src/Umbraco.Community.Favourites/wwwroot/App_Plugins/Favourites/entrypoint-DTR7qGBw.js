import { t as e } from "./client.gen-CjR-VnLg.js";
import { UMB_AUTH_CONTEXT as t } from "@umbraco-cms/backoffice/auth";
//#region src/entrypoints/entrypoint.ts
var n = (n, r) => {
	n.consumeContext(t, async (t) => {
		let n = t?.getOpenApiConfiguration();
		e.setConfig({
			auth: n?.token ?? void 0,
			baseUrl: n?.base ?? "",
			credentials: n?.credentials ?? "same-origin"
		});
	});
}, r = (e, t) => {};
//#endregion
export { n as onInit, r as onUnload };

//# sourceMappingURL=entrypoint-DTR7qGBw.js.map