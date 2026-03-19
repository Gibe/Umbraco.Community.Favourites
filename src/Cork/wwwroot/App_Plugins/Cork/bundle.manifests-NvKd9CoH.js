import { UmbConditionBase as R } from "@umbraco-cms/backoffice/extension-registry";
const B = [
  {
    name: "Cork Entrypoint",
    alias: "Cork.Entrypoint",
    type: "backofficeEntryPoint",
    js: () => import("./entrypoint-BsSFPrW6.js")
  }
], M = [
  {
    name: "Cork Sidebar App",
    alias: "Cork.Sidebar.App",
    type: "sectionSidebarApp",
    kind: "menuWithEntityActions",
    meta: {
      label: "Favourites",
      menu: "Cork.Menu"
    },
    weight: 999999,
    conditions: [
      {
        alias: "Umb.Condition.SectionAlias",
        match: "Umb.Section.Content"
      },
      {
        alias: "Cork.Condition.HasFavourites"
      }
    ]
  }
], V = [
  {
    name: "Cork Sidebar Menu",
    alias: "Cork.Menu",
    type: "menu",
    meta: {
      label: "Favourites"
    }
  }
], J = [
  {
    name: "Cork Menu Item",
    alias: "Cork.Menu.Item",
    type: "menuItem",
    element: () => import("./pins.element-B7VPNxTN.js"),
    meta: {
      label: "Favourites",
      icon: "icon-pin",
      entityType: "",
      menus: [
        "Cork.Menu"
      ]
    }
  }
], G = [
  {
    name: "Cork Entity Action",
    alias: "Cork.EntityAction",
    type: "entityAction",
    kind: "default",
    weight: 10,
    api: () => import("./entityaction-CxNN8UzC.js"),
    forEntityTypes: ["document"],
    meta: {
      label: "Favourite",
      icon: "icon-pushpin"
    },
    conditions: [
      {
        alias: "Umb.Condition.EntityIsNotTrashed"
      }
    ]
  }
], Q = {
  bodySerializer: (r) => JSON.stringify(
    r,
    (t, e) => typeof e == "bigint" ? e.toString() : e
  )
}, K = ({
  onSseError: r,
  onSseEvent: t,
  responseTransformer: e,
  responseValidator: c,
  sseDefaultRetryDelay: a,
  sseMaxRetryAttempts: l,
  sseMaxRetryDelay: o,
  sseSleepFn: n,
  url: i,
  ...u
}) => {
  let s;
  const h = n ?? ((C) => new Promise((f) => setTimeout(f, C)));
  return { stream: async function* () {
    let C = a ?? 3e3, f = 0;
    const m = u.signal ?? new AbortController().signal;
    for (; !m.aborted; ) {
      f++;
      const E = u.headers instanceof Headers ? u.headers : new Headers(u.headers);
      s !== void 0 && E.set("Last-Event-ID", s);
      try {
        const y = await fetch(i, { ...u, headers: E, signal: m });
        if (!y.ok)
          throw new Error(
            `SSE failed: ${y.status} ${y.statusText}`
          );
        if (!y.body) throw new Error("No body in SSE response");
        const g = y.body.pipeThrough(new TextDecoderStream()).getReader();
        let b = "";
        const d = () => {
          try {
            g.cancel();
          } catch {
          }
        };
        m.addEventListener("abort", d);
        try {
          for (; ; ) {
            const { done: S, value: D } = await g.read();
            if (S) break;
            b += D;
            const $ = b.split(`

`);
            b = $.pop() ?? "";
            for (const W of $) {
              const L = W.split(`
`), A = [];
              let O;
              for (const p of L)
                if (p.startsWith("data:"))
                  A.push(p.replace(/^data:\s*/, ""));
                else if (p.startsWith("event:"))
                  O = p.replace(/^event:\s*/, "");
                else if (p.startsWith("id:"))
                  s = p.replace(/^id:\s*/, "");
                else if (p.startsWith("retry:")) {
                  const I = Number.parseInt(
                    p.replace(/^retry:\s*/, ""),
                    10
                  );
                  Number.isNaN(I) || (C = I);
                }
              let k, T = !1;
              if (A.length) {
                const p = A.join(`
`);
                try {
                  k = JSON.parse(p), T = !0;
                } catch {
                  k = p;
                }
              }
              T && (c && await c(k), e && (k = await e(k))), t?.({
                data: k,
                event: O,
                id: s,
                retry: C
              }), A.length && (yield k);
            }
          }
        } finally {
          m.removeEventListener("abort", d), g.releaseLock();
        }
        break;
      } catch (y) {
        if (r?.(y), l !== void 0 && f >= l)
          break;
        const g = Math.min(
          C * 2 ** (f - 1),
          o ?? 3e4
        );
        await h(g);
      }
    }
  }() };
}, X = async (r, t) => {
  const e = typeof t == "function" ? await t(r) : t;
  if (e)
    return r.scheme === "bearer" ? `Bearer ${e}` : r.scheme === "basic" ? `Basic ${btoa(e)}` : e;
}, Y = (r) => {
  switch (r) {
    case "label":
      return ".";
    case "matrix":
      return ";";
    case "simple":
      return ",";
    default:
      return "&";
  }
}, Z = (r) => {
  switch (r) {
    case "form":
      return ",";
    case "pipeDelimited":
      return "|";
    case "spaceDelimited":
      return "%20";
    default:
      return ",";
  }
}, ee = (r) => {
  switch (r) {
    case "label":
      return ".";
    case "matrix":
      return ";";
    case "simple":
      return ",";
    default:
      return "&";
  }
}, U = ({
  allowReserved: r,
  explode: t,
  name: e,
  style: c,
  value: a
}) => {
  if (!t) {
    const n = (r ? a : a.map((i) => encodeURIComponent(i))).join(Z(c));
    switch (c) {
      case "label":
        return `.${n}`;
      case "matrix":
        return `;${e}=${n}`;
      case "simple":
        return n;
      default:
        return `${e}=${n}`;
    }
  }
  const l = Y(c), o = a.map((n) => c === "label" || c === "simple" ? r ? n : encodeURIComponent(n) : x({
    allowReserved: r,
    name: e,
    value: n
  })).join(l);
  return c === "label" || c === "matrix" ? l + o : o;
}, x = ({
  allowReserved: r,
  name: t,
  value: e
}) => {
  if (e == null)
    return "";
  if (typeof e == "object")
    throw new Error(
      "Deeply-nested arrays/objects aren’t supported. Provide your own `querySerializer()` to handle these."
    );
  return `${t}=${r ? e : encodeURIComponent(e)}`;
}, q = ({
  allowReserved: r,
  explode: t,
  name: e,
  style: c,
  value: a,
  valueOnly: l
}) => {
  if (a instanceof Date)
    return l ? a.toISOString() : `${e}=${a.toISOString()}`;
  if (c !== "deepObject" && !t) {
    let i = [];
    Object.entries(a).forEach(([s, h]) => {
      i = [
        ...i,
        s,
        r ? h : encodeURIComponent(h)
      ];
    });
    const u = i.join(",");
    switch (c) {
      case "form":
        return `${e}=${u}`;
      case "label":
        return `.${u}`;
      case "matrix":
        return `;${e}=${u}`;
      default:
        return u;
    }
  }
  const o = ee(c), n = Object.entries(a).map(
    ([i, u]) => x({
      allowReserved: r,
      name: c === "deepObject" ? `${e}[${i}]` : i,
      value: u
    })
  ).join(o);
  return c === "label" || c === "matrix" ? o + n : n;
}, te = /\{[^{}]+\}/g, re = ({ path: r, url: t }) => {
  let e = t;
  const c = t.match(te);
  if (c)
    for (const a of c) {
      let l = !1, o = a.substring(1, a.length - 1), n = "simple";
      o.endsWith("*") && (l = !0, o = o.substring(0, o.length - 1)), o.startsWith(".") ? (o = o.substring(1), n = "label") : o.startsWith(";") && (o = o.substring(1), n = "matrix");
      const i = r[o];
      if (i == null)
        continue;
      if (Array.isArray(i)) {
        e = e.replace(
          a,
          U({ explode: l, name: o, style: n, value: i })
        );
        continue;
      }
      if (typeof i == "object") {
        e = e.replace(
          a,
          q({
            explode: l,
            name: o,
            style: n,
            value: i,
            valueOnly: !0
          })
        );
        continue;
      }
      if (n === "matrix") {
        e = e.replace(
          a,
          `;${x({
            name: o,
            value: i
          })}`
        );
        continue;
      }
      const u = encodeURIComponent(
        n === "label" ? `.${i}` : i
      );
      e = e.replace(a, u);
    }
  return e;
}, se = ({
  baseUrl: r,
  path: t,
  query: e,
  querySerializer: c,
  url: a
}) => {
  const l = a.startsWith("/") ? a : `/${a}`;
  let o = (r ?? "") + l;
  t && (o = re({ path: t, url: o }));
  let n = e ? c(e) : "";
  return n.startsWith("?") && (n = n.substring(1)), n && (o += `?${n}`), o;
}, N = ({
  allowReserved: r,
  array: t,
  object: e
} = {}) => (a) => {
  const l = [];
  if (a && typeof a == "object")
    for (const o in a) {
      const n = a[o];
      if (n != null)
        if (Array.isArray(n)) {
          const i = U({
            allowReserved: r,
            explode: !0,
            name: o,
            style: "form",
            value: n,
            ...t
          });
          i && l.push(i);
        } else if (typeof n == "object") {
          const i = q({
            allowReserved: r,
            explode: !0,
            name: o,
            style: "deepObject",
            value: n,
            ...e
          });
          i && l.push(i);
        } else {
          const i = x({
            allowReserved: r,
            name: o,
            value: n
          });
          i && l.push(i);
        }
    }
  return l.join("&");
}, ne = (r) => {
  if (!r)
    return "stream";
  const t = r.split(";")[0]?.trim();
  if (t) {
    if (t.startsWith("application/json") || t.endsWith("+json"))
      return "json";
    if (t === "multipart/form-data")
      return "formData";
    if (["application/", "audio/", "image/", "video/"].some(
      (e) => t.startsWith(e)
    ))
      return "blob";
    if (t.startsWith("text/"))
      return "text";
  }
}, ae = (r, t) => t ? !!(r.headers.has(t) || r.query?.[t] || r.headers.get("Cookie")?.includes(`${t}=`)) : !1, ie = async ({
  security: r,
  ...t
}) => {
  for (const e of r) {
    if (ae(t, e.name))
      continue;
    const c = await X(e, t.auth);
    if (!c)
      continue;
    const a = e.name ?? "Authorization";
    switch (e.in) {
      case "query":
        t.query || (t.query = {}), t.query[a] = c;
        break;
      case "cookie":
        t.headers.append("Cookie", `${a}=${c}`);
        break;
      case "header":
      default:
        t.headers.set(a, c);
        break;
    }
  }
}, _ = (r) => se({
  baseUrl: r.baseUrl,
  path: r.path,
  query: r.query,
  querySerializer: typeof r.querySerializer == "function" ? r.querySerializer : N(r.querySerializer),
  url: r.url
}), z = (r, t) => {
  const e = { ...r, ...t };
  return e.baseUrl?.endsWith("/") && (e.baseUrl = e.baseUrl.substring(0, e.baseUrl.length - 1)), e.headers = P(r.headers, t.headers), e;
}, P = (...r) => {
  const t = new Headers();
  for (const e of r) {
    if (!e || typeof e != "object")
      continue;
    const c = e instanceof Headers ? e.entries() : Object.entries(e);
    for (const [a, l] of c)
      if (l === null)
        t.delete(a);
      else if (Array.isArray(l))
        for (const o of l)
          t.append(a, o);
      else l !== void 0 && t.set(
        a,
        typeof l == "object" ? JSON.stringify(l) : l
      );
  }
  return t;
};
class v {
  constructor() {
    this._fns = [];
  }
  clear() {
    this._fns = [];
  }
  getInterceptorIndex(t) {
    return typeof t == "number" ? this._fns[t] ? t : -1 : this._fns.indexOf(t);
  }
  exists(t) {
    const e = this.getInterceptorIndex(t);
    return !!this._fns[e];
  }
  eject(t) {
    const e = this.getInterceptorIndex(t);
    this._fns[e] && (this._fns[e] = null);
  }
  update(t, e) {
    const c = this.getInterceptorIndex(t);
    return this._fns[c] ? (this._fns[c] = e, t) : !1;
  }
  use(t) {
    return this._fns = [...this._fns, t], this._fns.length - 1;
  }
}
const oe = () => ({
  error: new v(),
  request: new v(),
  response: new v()
}), ce = N({
  allowReserved: !1,
  array: {
    explode: !0,
    style: "form"
  },
  object: {
    explode: !0,
    style: "deepObject"
  }
}), le = {
  "Content-Type": "application/json"
}, H = (r = {}) => ({
  ...Q,
  headers: le,
  parseAs: "auto",
  querySerializer: ce,
  ...r
}), ue = (r = {}) => {
  let t = z(H(), r);
  const e = () => ({ ...t }), c = (u) => (t = z(t, u), e()), a = oe(), l = async (u) => {
    const s = {
      ...t,
      ...u,
      fetch: u.fetch ?? t.fetch ?? globalThis.fetch,
      headers: P(t.headers, u.headers),
      serializedBody: void 0
    };
    s.security && await ie({
      ...s,
      security: s.security
    }), s.requestValidator && await s.requestValidator(s), s.body && s.bodySerializer && (s.serializedBody = s.bodySerializer(s.body)), (s.serializedBody === void 0 || s.serializedBody === "") && s.headers.delete("Content-Type");
    const h = _(s);
    return { opts: s, url: h };
  }, o = async (u) => {
    const { opts: s, url: h } = await l(u), j = {
      redirect: "follow",
      ...s,
      body: s.serializedBody
    };
    let w = new Request(h, j);
    for (const d of a.request._fns)
      d && (w = await d(w, s));
    const C = s.fetch;
    let f = await C(w);
    for (const d of a.response._fns)
      d && (f = await d(f, w, s));
    const m = {
      request: w,
      response: f
    };
    if (f.ok) {
      if (f.status === 204 || f.headers.get("Content-Length") === "0")
        return s.responseStyle === "data" ? {} : {
          data: {},
          ...m
        };
      const d = (s.parseAs === "auto" ? ne(f.headers.get("Content-Type")) : s.parseAs) ?? "json";
      let S;
      switch (d) {
        case "arrayBuffer":
        case "blob":
        case "formData":
        case "json":
        case "text":
          S = await f[d]();
          break;
        case "stream":
          return s.responseStyle === "data" ? f.body : {
            data: f.body,
            ...m
          };
      }
      return d === "json" && (s.responseValidator && await s.responseValidator(S), s.responseTransformer && (S = await s.responseTransformer(S))), s.responseStyle === "data" ? S : {
        data: S,
        ...m
      };
    }
    const E = await f.text();
    let y;
    try {
      y = JSON.parse(E);
    } catch {
    }
    const g = y ?? E;
    let b = g;
    for (const d of a.error._fns)
      d && (b = await d(g, f, w, s));
    if (b = b || {}, s.throwOnError)
      throw b;
    return s.responseStyle === "data" ? void 0 : {
      error: b,
      ...m
    };
  }, n = (u) => (s) => o({ ...s, method: u }), i = (u) => async (s) => {
    const { opts: h, url: j } = await l(s);
    return K({
      ...h,
      body: h.body,
      headers: h.headers,
      method: u,
      url: j
    });
  };
  return {
    buildUrl: _,
    connect: n("CONNECT"),
    delete: n("DELETE"),
    get: n("GET"),
    getConfig: e,
    head: n("HEAD"),
    interceptors: a,
    options: n("OPTIONS"),
    patch: n("PATCH"),
    post: n("POST"),
    put: n("PUT"),
    request: o,
    setConfig: c,
    sse: {
      connect: i("CONNECT"),
      delete: i("DELETE"),
      get: i("GET"),
      head: i("HEAD"),
      options: i("OPTIONS"),
      patch: i("PATCH"),
      post: i("POST"),
      put: i("PUT"),
      trace: i("TRACE")
    },
    trace: n("TRACE")
  };
}, fe = ue(H({
  baseUrl: "https://localhost:44389"
})), F = "Cork.Condition.HasFavourites";
class de extends R {
  constructor(t, e) {
    super(t, e), this._boundRefresh = () => this._checkFavourites(), this._checkFavourites(), window.addEventListener("cork-favourites-updated", this._boundRefresh);
  }
  async _checkFavourites() {
    const { data: t, error: e } = await fe.get({
      url: "/umbraco/cork/api/v1/favourites",
      security: [{ scheme: "bearer", type: "http" }]
    });
    this.permitted = !e && Array.isArray(t) && t.length > 0;
  }
  destroy() {
    window.removeEventListener("cork-favourites-updated", this._boundRefresh), super.destroy();
  }
}
const he = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  HAS_FAVOURITES_CONDITION_ALIAS: F,
  default: de
}, Symbol.toStringTag, { value: "Module" })), pe = [
  {
    name: "Cork Has Favourites Condition",
    alias: F,
    type: "condition",
    api: () => Promise.resolve().then(() => he)
  }
], me = [
  ...B,
  ...M,
  ...V,
  ...J,
  ...G,
  ...pe
];
export {
  fe as c,
  me as m
};
//# sourceMappingURL=bundle.manifests-NvKd9CoH.js.map
