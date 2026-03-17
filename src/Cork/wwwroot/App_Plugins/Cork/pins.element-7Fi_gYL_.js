import { LitElement as v, html as n, css as h, state as d, customElement as _ } from "@umbraco-cms/backoffice/external/lit";
import { UmbElementMixin as p } from "@umbraco-cms/backoffice/element-api";
import { c } from "./client.gen-Ce7o8kG8.js";
var m = Object.defineProperty, f = Object.getOwnPropertyDescriptor, i = (e, t, r, s) => {
  for (var o = s > 1 ? void 0 : s ? f(t, r) : t, u = e.length - 1, l; u >= 0; u--)
    (l = e[u]) && (o = (s ? l(t, r, o) : l(o)) || o);
  return s && o && m(t, r, o), o;
};
let a = class extends p(v) {
  constructor() {
    super(...arguments), this._favourites = [], this._loading = !0, this._dragIndex = null, this._dragOverIndex = null, this._boundRefresh = () => this._loadFavourites();
  }
  connectedCallback() {
    super.connectedCallback(), this._loadFavourites(), window.addEventListener("cork-favourites-updated", this._boundRefresh);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), window.removeEventListener("cork-favourites-updated", this._boundRefresh);
  }
  async _loadFavourites() {
    this._loading = !0;
    const { data: e, error: t } = await c.get({
      url: "/umbraco/cork/api/v1/favourites",
      security: [{ scheme: "bearer", type: "http" }]
    });
    !t && e && (this._favourites = e), this._loading = !1;
  }
  _navigateToNode(e) {
    window.history.pushState(
      {},
      "",
      `/umbraco/section/content/workspace/document/edit/${e}`
    ), window.dispatchEvent(new PopStateEvent("popstate"));
  }
  async _removeFavourite(e, t) {
    e.stopPropagation(), await c.delete({
      url: "/umbraco/cork/api/v1/favourites/{nodeKey}",
      path: { nodeKey: t },
      security: [{ scheme: "bearer", type: "http" }]
    }), this._loadFavourites();
  }
  _onDragStart(e, t) {
    this._dragIndex = e, t.dataTransfer && (t.dataTransfer.effectAllowed = "move");
  }
  _onDragOver(e, t) {
    t.preventDefault(), t.dataTransfer && (t.dataTransfer.dropEffect = "move"), this._dragOverIndex = e;
  }
  _onDragEnd() {
    if (this._dragIndex !== null && this._dragOverIndex !== null && this._dragIndex !== this._dragOverIndex) {
      const e = [...this._favourites], [t] = e.splice(this._dragIndex, 1);
      e.splice(this._dragOverIndex, 0, t), this._favourites = e, this._saveSortOrder();
    }
    this._dragIndex = null, this._dragOverIndex = null;
  }
  async _saveSortOrder() {
    await c.put({
      url: "/umbraco/cork/api/v1/favourites/sort",
      body: { nodeKeys: this._favourites.map((e) => e.nodeKey) },
      security: [{ scheme: "bearer", type: "http" }]
    });
  }
  render() {
    return this._loading ? n`<uui-loader></uui-loader>` : this._favourites.length === 0 ? n`<uui-menu-item label="No favourites pinned" disabled></uui-menu-item>` : n`
      ${this._favourites.map(
      (e, t) => n`
          <div
            class="sortable-item ${this._dragOverIndex === t ? "drag-over" : ""}"
            draggable="true"
            @dragstart=${(r) => this._onDragStart(t, r)}
            @dragover=${(r) => this._onDragOver(t, r)}
            @dragend=${() => this._onDragEnd()}
          >
            <uui-menu-item
              label=${e.nodeName}
              @click-label=${() => this._navigateToNode(e.nodeKey)}
            >
              <uui-icon slot="icon" name="icon-document"></uui-icon>
              <uui-action-bar slot="actions">
                <uui-button
                  label="Remove"
                  @click=${(r) => this._removeFavourite(r, e.nodeKey)}
                >
                  <uui-icon name="icon-trash"></uui-icon>
                </uui-button>
              </uui-action-bar>
            </uui-menu-item>
          </div>
        `
    )}
    `;
  }
};
a.styles = [
  h`
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
    `
];
i([
  d()
], a.prototype, "_favourites", 2);
i([
  d()
], a.prototype, "_loading", 2);
i([
  d()
], a.prototype, "_dragIndex", 2);
i([
  d()
], a.prototype, "_dragOverIndex", 2);
a = i([
  _("cork-pins")
], a);
const x = a;
export {
  a as Pins,
  x as default
};
//# sourceMappingURL=pins.element-7Fi_gYL_.js.map
