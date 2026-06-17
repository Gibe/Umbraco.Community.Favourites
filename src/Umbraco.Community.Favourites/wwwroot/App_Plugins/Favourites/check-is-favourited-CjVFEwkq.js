import { t as e } from "./client.gen-BqX9kGvI.js";
//#region src/conditions/check-is-favourited.ts
async function t(t) {
	if (!t) return !1;
	let { data: n, error: r } = await e.get({
		url: "/umbraco/favourites/api/v1/favourites",
		security: [{
			scheme: "bearer",
			type: "http"
		}]
	});
	return !r && Array.isArray(n) && n.some((e) => e.nodeKey === t);
}
//#endregion
export { t };

//# sourceMappingURL=check-is-favourited-CjVFEwkq.js.map