import { LitElement as C, html as m, css as b, property as P, state as w, customElement as y } from "@umbraco-cms/backoffice/external/lit";
import { UmbElementMixin as E } from "@umbraco-cms/backoffice/element-api";
import { UMB_DOCUMENT_WORKSPACE_CONTEXT as x } from "@umbraco-cms/backoffice/document";
import { c as O } from "./client.gen-Ce7o8kG8.js";
var W = Object.defineProperty, M = Object.getOwnPropertyDescriptor, g = (t) => {
  throw TypeError(t);
}, p = (t, e, i, n) => {
  for (var a = n > 1 ? void 0 : n ? M(e, i) : e, l = t.length - 1, d; l >= 0; l--)
    (d = t[l]) && (a = (n ? d(e, i, a) : d(a)) || a);
  return n && a && W(e, i, a), a;
}, v = (t, e, i) => e.has(t) || g("Cannot " + i), u = (t, e, i) => (v(t, e, "read from private field"), e.get(t)), h = (t, e, i) => e.has(t) ? g("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, i), U = (t, e, i, n) => (v(t, e, "write to private field"), e.set(t, i), i), _ = (t, e, i) => (v(t, e, "access private method"), i), r, c, o, f, k;
let s = class extends E(C) {
  constructor() {
    super(), h(this, o), this._isPinned = !1, this._loading = !0, h(this, r), h(this, c, () => _(this, o, f).call(this)), this.consumeContext(x, (t) => {
      U(this, r, t), _(this, o, f).call(this);
    });
  }
  connectedCallback() {
    super.connectedCallback(), window.addEventListener("favourites-updated", u(this, c));
  }
  disconnectedCallback() {
    window.removeEventListener("favourites-updated", u(this, c)), super.disconnectedCallback();
  }
  render() {
    if (this._loading)
      return m`<uui-button look="outline" disabled label="Loading..."></uui-button>`;
    const t = this._isPinned ? "Unfavourite" : "Favourite", e = this._isPinned ? "icon-wrong" : "icon-pushpin";
    return m`
      <uui-button
        @click=${_(this, o, k)}
        look="outline"
        color="default"
        label=${t}
        compact=""
        class="favourites-workspace-button"
      >
        <uui-icon name=${e}></uui-icon>
        <span>${t}</span>
      </uui-button>
    `;
  }
};
r = /* @__PURE__ */ new WeakMap();
c = /* @__PURE__ */ new WeakMap();
o = /* @__PURE__ */ new WeakSet();
f = async function() {
  const t = u(this, r)?.getUnique(), e = u(this, r)?.getIsNew();
  if (!t || e) {
    this._loading = !1;
    return;
  }
  const { data: i } = await O.get({
    url: "/umbraco/favourites/api/v1/favourites",
    security: [{ scheme: "bearer", type: "http" }]
  }), n = i ?? [];
  this._isPinned = n.some((a) => a.nodeKey === t), this._loading = !1;
};
k = async function() {
  this.api && (this._loading = !0, await this.api.execute(), this._loading = !1);
};
s.styles = b`
    .favourites-workspace-button span {
      margin: 0 6px 0 2px;
    }

    .favourites-workspace-button uui-icon {
      margin-left: 3px;
    }
  `;
p([
  P({ attribute: !1 })
], s.prototype, "api", 2);
p([
  w()
], s.prototype, "_isPinned", 2);
p([
  w()
], s.prototype, "_loading", 2);
s = p([
  y("favourites-pin-workspace-action")
], s);
export {
  s as default
};
//# sourceMappingURL=workspaceaction.element-BUrpJchJ.js.map
