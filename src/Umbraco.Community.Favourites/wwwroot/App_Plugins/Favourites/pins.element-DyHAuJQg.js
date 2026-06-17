import { t as e } from "./client.gen-BqX9kGvI.js";
import { t } from "./decorate-CaYbmmmm.js";
import { UmbRequestReloadStructureForEntityEvent as n } from "@umbraco-cms/backoffice/entity-action";
import { UMB_NOTIFICATION_CONTEXT as r } from "@umbraco-cms/backoffice/notification";
import { LitElement as i, css as a, customElement as o, html as s, state as c } from "@umbraco-cms/backoffice/external/lit";
import { UmbElementMixin as l } from "@umbraco-cms/backoffice/element-api";
import { UMB_ACTION_EVENT_CONTEXT as u } from "@umbraco-cms/backoffice/action";
//#region src/sidebars/pins.element.ts
var d = class extends l(i) {
	constructor(...e) {
		super(...e), this._favourites = [], this._loading = !0, this._dragIndex = null, this._dragOverIndex = null, this._boundRefresh = () => this._loadFavourites();
	}
	connectedCallback() {
		super.connectedCallback(), this._loadFavourites(), window.addEventListener("favourites-updated", this._boundRefresh), this.consumeContext(u, (e) => {
			this._actionEventContext = e, e && e.addEventListener(n.TYPE, this._boundRefresh);
		}), this.consumeContext(r, (e) => {
			this._notificationContext = e;
		});
	}
	disconnectedCallback() {
		super.disconnectedCallback(), window.removeEventListener("favourites-updated", this._boundRefresh), this._actionEventContext?.removeEventListener(n.TYPE, this._boundRefresh);
	}
	async _loadFavourites() {
		this._loading = !0;
		let { data: t, error: n } = await e.get({
			url: "/umbraco/favourites/api/v1/favourites",
			security: [{
				scheme: "bearer",
				type: "http"
			}]
		});
		!n && t && (this._favourites = t), this._loading = !1;
	}
	_navigateToNode(e) {
		window.history.pushState({}, "", `/umbraco/section/content/workspace/document/edit/${e}`), window.dispatchEvent(new PopStateEvent("popstate"));
	}
	async _removeFavourite(t, n) {
		t.stopPropagation();
		let { error: r } = await e.delete({
			url: "/umbraco/favourites/api/v1/favourites/{nodeKey}",
			path: { nodeKey: n },
			security: [{
				scheme: "bearer",
				type: "http"
			}]
		});
		r ? this._notificationContext?.peek("danger", { data: {
			headline: "Failed to remove favourite",
			message: ""
		} }) : this._notificationContext?.peek("positive", { data: {
			headline: "Removed from favourites",
			message: ""
		} }), this._loadFavourites(), window.dispatchEvent(new CustomEvent("favourites-updated"));
	}
	_onDragStart(e, t) {
		this._dragIndex = e, t.dataTransfer && (t.dataTransfer.effectAllowed = "move");
	}
	_onDragOver(e, t) {
		t.preventDefault(), t.dataTransfer && (t.dataTransfer.dropEffect = "move"), this._dragOverIndex = e;
	}
	_onDragEnd() {
		if (this._dragIndex !== null && this._dragOverIndex !== null && this._dragIndex !== this._dragOverIndex) {
			let e = [...this._favourites], [t] = e.splice(this._dragIndex, 1);
			e.splice(this._dragOverIndex, 0, t), this._favourites = e, this._saveSortOrder();
		}
		this._dragIndex = null, this._dragOverIndex = null;
	}
	async _saveSortOrder() {
		await e.put({
			url: "/umbraco/favourites/api/v1/favourites/sort",
			body: { nodeKeys: this._favourites.map((e) => e.nodeKey) },
			security: [{
				scheme: "bearer",
				type: "http"
			}]
		});
	}
	render() {
		return this._loading ? s`` : this._favourites.length === 0 ? s`<uui-menu-item label="No favourites pinned" disabled></uui-menu-item>` : s`
      ${this._favourites.map((e, t) => s`
          <div
            class="sortable-item ${this._dragOverIndex === t ? "drag-over" : ""}"
            draggable="true"
            @dragstart=${(e) => this._onDragStart(t, e)}
            @dragover=${(e) => this._onDragOver(t, e)}
            @dragend=${() => this._onDragEnd()}
          >
            <uui-menu-item
              label=${e.nodeName}
              @click-label=${() => this._navigateToNode(e.nodeKey)}
              class=${e.published ? "" : "draft"}
            >
              <uui-icon slot="icon" name="${e.icon}"></uui-icon>
              <uui-action-bar slot="actions">
                <uui-button
                  label="Remove"
                  @click=${(t) => this._removeFavourite(t, e.nodeKey)}
                >
                  <uui-icon name="icon-delete"></uui-icon>
                </uui-button>
              </uui-action-bar>
            </uui-menu-item>
          </div>
        `)}
    `;
	}
	static {
		this.styles = [a`
      :host {
        display: contents;
      }

      .sortable-item {
        cursor: grab;
        transition: opacity 120ms ease;
      }

      .sortable-item.drag-over {
        border-top: 2px solid var(--uui-color-focus);
      }

      .draft {
          opacity: 0.6;
      }
    `];
	}
};
t([c()], d.prototype, "_favourites", void 0), t([c()], d.prototype, "_loading", void 0), t([c()], d.prototype, "_dragIndex", void 0), t([c()], d.prototype, "_dragOverIndex", void 0), d = t([o("favourites-pins")], d);
var f = d;
//#endregion
export { d as Pins, f as default };

//# sourceMappingURL=pins.element-DyHAuJQg.js.map