import { t as e } from "./client.gen-BqX9kGvI.js";
import { t } from "./decorate-CaYbmmmm.js";
import { LitElement as n, css as r, customElement as i, html as a, property as o, state as s } from "@umbraco-cms/backoffice/external/lit";
import { UmbElementMixin as c } from "@umbraco-cms/backoffice/element-api";
import { UMB_DOCUMENT_WORKSPACE_CONTEXT as l } from "@umbraco-cms/backoffice/document";
//#region src/workspaceactions/workspaceaction.element.ts
var u = class extends c(n) {
	#e;
	#t;
	constructor() {
		super(), this._isPinned = !1, this._loading = !0, this.#t = () => this.#n(), this.consumeContext(l, (e) => {
			this.#e = e, this.#n();
		});
	}
	connectedCallback() {
		super.connectedCallback(), window.addEventListener("favourites-updated", this.#t);
	}
	disconnectedCallback() {
		window.removeEventListener("favourites-updated", this.#t), super.disconnectedCallback();
	}
	async #n() {
		let t = this.#e?.getUnique(), n = this.#e?.getIsNew();
		if (!t || n) {
			this._loading = !1;
			return;
		}
		let { data: r } = await e.get({
			url: "/umbraco/favourites/api/v1/favourites",
			security: [{
				scheme: "bearer",
				type: "http"
			}]
		}), i = r ?? [];
		this._isPinned = i.some((e) => e.nodeKey === t), this._loading = !1;
	}
	async #r() {
		this.api && (this._loading = !0, await this.api.execute(), this._loading = !1);
	}
	static {
		this.styles = r`
    .favourites-workspace-button span {
      margin: 0 6px 0 2px;
    }

    .favourites-workspace-button uui-icon {
      margin-left: 3px;
    }
  `;
	}
	render() {
		if (this._loading) return a`<uui-button look="outline" disabled label="Loading..."></uui-button>`;
		let e = this._isPinned ? "Unfavourite" : "Favourite", t = this._isPinned ? "icon-wrong" : "icon-pushpin";
		return a`
      <uui-button
        @click=${this.#r}
        look="outline"
        color="default"
        label=${e}
        compact=""
        class="favourites-workspace-button"
      >
        <uui-icon name=${t}></uui-icon>
        <span>${e}</span>
      </uui-button>
    `;
	}
};
t([o({ attribute: !1 })], u.prototype, "api", void 0), t([s()], u.prototype, "_isPinned", void 0), t([s()], u.prototype, "_loading", void 0), u = t([i("favourites-pin-workspace-action")], u);
var d = u;
//#endregion
export { d as default };

//# sourceMappingURL=workspaceaction.element-BFaKxIuL.js.map