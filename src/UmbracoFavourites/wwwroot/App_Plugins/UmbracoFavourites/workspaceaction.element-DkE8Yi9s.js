import { LitElement as k, html as m, css as C, property as P, state as b, customElement as y } from "@umbraco-cms/backoffice/external/lit";
import { UmbElementMixin as E } from "@umbraco-cms/backoffice/element-api";
import { UMB_DOCUMENT_WORKSPACE_CONTEXT as x } from "@umbraco-cms/backoffice/document";
import { c as U } from "./client.gen-Ce7o8kG8.js";
var O = Object.defineProperty, W = Object.getOwnPropertyDescriptor, w = (t) => {
  throw TypeError(t);
}, p = (t, e, i, o) => {
  for (var a = o > 1 ? void 0 : o ? W(e, i) : e, l = t.length - 1, d; l >= 0; l--)
    (d = t[l]) && (a = (o ? d(e, i, a) : d(a)) || a);
  return o && a && O(e, i, a), a;
}, v = (t, e, i) => e.has(t) || w("Cannot " + i), u = (t, e, i) => (v(t, e, "read from private field"), e.get(t)), h = (t, e, i) => e.has(t) ? w("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, i), M = (t, e, i, o) => (v(t, e, "write to private field"), e.set(t, i), i), _ = (t, e, i) => (v(t, e, "access private method"), i), r, c, s, f, g;
let n = class extends E(k) {
  constructor() {
    super(), h(this, s), this._isPinned = !1, this._loading = !0, h(this, r), h(this, c, () => _(this, s, f).call(this)), this.consumeContext(x, (t) => {
      M(this, r, t), _(this, s, f).call(this);
    });
  }
  connectedCallback() {
    super.connectedCallback(), window.addEventListener("umbraco-favourites-updated", u(this, c));
  }
  disconnectedCallback() {
    window.removeEventListener("umbraco-favourites-updated", u(this, c)), super.disconnectedCallback();
  }
  render() {
    if (this._loading)
      return m`<uui-button look="outline" disabled label="Loading..."></uui-button>`;
    const t = this._isPinned ? "Unfavourite" : "Favourite", e = this._isPinned ? "icon-wrong" : "icon-pushpin";
    return m`
      <uui-button
        @click=${_(this, s, g)}
        look="outline"
        color="default"
        label=${t}
        compact=""
        class="umbraco-favourites-workspace-button"
      >
        <uui-icon name=${e}></uui-icon>
        <span>${t}</span>
      </uui-button>
    `;
  }
};
r = /* @__PURE__ */ new WeakMap();
c = /* @__PURE__ */ new WeakMap();
s = /* @__PURE__ */ new WeakSet();
f = async function() {
  const t = u(this, r)?.getUnique(), e = u(this, r)?.getIsNew();
  if (!t || e) {
    this._loading = !1;
    return;
  }
  const { data: i } = await U.get({
    url: "/umbraco/favourites/api/v1/favourites",
    security: [{ scheme: "bearer", type: "http" }]
  }), o = i ?? [];
  this._isPinned = o.some((a) => a.nodeKey === t), this._loading = !1;
};
g = async function() {
  this.api && (this._loading = !0, await this.api.execute(), this._loading = !1);
};
n.styles = C`
    .umbraco-favourites-workspace-button span {
      margin: 0 6px 0 2px;
    }

    .umbraco-favourites-workspace-button uui-icon {
      margin-left: 3px;
    }
  `;
p([
  P({ attribute: !1 })
], n.prototype, "api", 2);
p([
  b()
], n.prototype, "_isPinned", 2);
p([
  b()
], n.prototype, "_loading", 2);
n = p([
  y("umbraco-favourites-pin-workspace-action")
], n);
export {
  n as default
};
//# sourceMappingURL=workspaceaction.element-DkE8Yi9s.js.map
