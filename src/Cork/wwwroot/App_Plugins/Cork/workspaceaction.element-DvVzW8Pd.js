import { LitElement as P, html as k, property as g, state as m, customElement as y } from "@umbraco-cms/backoffice/external/lit";
import { UmbElementMixin as E } from "@umbraco-cms/backoffice/element-api";
import { UMB_DOCUMENT_WORKSPACE_CONTEXT as b } from "@umbraco-cms/backoffice/document";
import { c as O } from "./client.gen-Ce7o8kG8.js";
var W = Object.defineProperty, x = Object.getOwnPropertyDescriptor, w = (t) => {
  throw TypeError(t);
}, u = (t, e, i, a) => {
  for (var n = a > 1 ? void 0 : a ? x(e, i) : e, p = t.length - 1, d; p >= 0; p--)
    (d = t[p]) && (n = (a ? d(e, i, n) : d(n)) || n);
  return a && n && W(e, i, n), n;
}, v = (t, e, i) => e.has(t) || w("Cannot " + i), l = (t, e, i) => (v(t, e, "read from private field"), e.get(t)), h = (t, e, i) => e.has(t) ? w("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, i), M = (t, e, i, a) => (v(t, e, "write to private field"), e.set(t, i), i), _ = (t, e, i) => (v(t, e, "access private method"), i), o, c, s, f, C;
let r = class extends E(P) {
  constructor() {
    super(), h(this, s), this._isPinned = !1, this._loading = !0, h(this, o), h(this, c, () => _(this, s, f).call(this)), this.consumeContext(b, (t) => {
      M(this, o, t), _(this, s, f).call(this);
    });
  }
  connectedCallback() {
    super.connectedCallback(), window.addEventListener("cork-favourites-updated", l(this, c));
  }
  disconnectedCallback() {
    window.removeEventListener("cork-favourites-updated", l(this, c)), super.disconnectedCallback();
  }
  render() {
    if (this._loading)
      return k`<uui-button look="secondary" disabled label="Loading..."></uui-button>`;
    const t = this._isPinned ? "Unpin" : "Pin", e = this._isPinned ? "icon-wrong" : "icon-pushpin";
    return k`
      <uui-button
        @click=${_(this, s, C)}
        look=${this._isPinned ? "outline" : "secondary"}
        color="default"
        label=${t}
      >
        <uui-icon name=${e}></uui-icon>
        ${t}
      </uui-button>
    `;
  }
};
o = /* @__PURE__ */ new WeakMap();
c = /* @__PURE__ */ new WeakMap();
s = /* @__PURE__ */ new WeakSet();
f = async function() {
  const t = l(this, o)?.getUnique(), e = l(this, o)?.getIsNew();
  if (!t || e) {
    this._loading = !1;
    return;
  }
  const { data: i } = await O.get({
    url: "/umbraco/cork/api/v1/favourites",
    security: [{ scheme: "bearer", type: "http" }]
  }), a = i ?? [];
  this._isPinned = a.some((n) => n.nodeKey === t), this._loading = !1;
};
C = async function() {
  this.api && (this._loading = !0, await this.api.execute(), this._loading = !1);
};
u([
  g({ attribute: !1 })
], r.prototype, "api", 2);
u([
  m()
], r.prototype, "_isPinned", 2);
u([
  m()
], r.prototype, "_loading", 2);
r = u([
  y("cork-pin-workspace-action")
], r);
export {
  r as default
};
//# sourceMappingURL=workspaceaction.element-DvVzW8Pd.js.map
