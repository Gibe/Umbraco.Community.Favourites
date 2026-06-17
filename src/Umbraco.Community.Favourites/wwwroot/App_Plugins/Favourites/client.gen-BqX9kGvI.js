//#region src/api/core/bodySerializer.gen.ts
var e = { bodySerializer: (e) => JSON.stringify(e, (e, t) => typeof t == "bigint" ? t.toString() : t) };
Object.entries({
	$body_: "body",
	$headers_: "headers",
	$path_: "path",
	$query_: "query"
});
//#endregion
//#region src/api/core/serverSentEvents.gen.ts
var t = ({ onSseError: e, onSseEvent: t, responseTransformer: n, responseValidator: r, sseDefaultRetryDelay: i, sseMaxRetryAttempts: a, sseMaxRetryDelay: o, sseSleepFn: s, url: c, ...l }) => {
	let u, d = s ?? ((e) => new Promise((t) => setTimeout(t, e)));
	return { stream: async function* () {
		let s = i ?? 3e3, f = 0, p = l.signal ?? new AbortController().signal;
		for (; !p.aborted;) {
			f++;
			let i = l.headers instanceof Headers ? l.headers : new Headers(l.headers);
			u !== void 0 && i.set("Last-Event-ID", u);
			try {
				let e = await fetch(c, {
					...l,
					headers: i,
					signal: p
				});
				if (!e.ok) throw Error(`SSE failed: ${e.status} ${e.statusText}`);
				if (!e.body) throw Error("No body in SSE response");
				let a = e.body.pipeThrough(new TextDecoderStream()).getReader(), o = "", d = () => {
					try {
						a.cancel();
					} catch {}
				};
				p.addEventListener("abort", d);
				try {
					for (;;) {
						let { done: e, value: i } = await a.read();
						if (e) break;
						o += i;
						let c = o.split("\n\n");
						o = c.pop() ?? "";
						for (let e of c) {
							let i = e.split("\n"), a = [], o;
							for (let e of i) if (e.startsWith("data:")) a.push(e.replace(/^data:\s*/, ""));
							else if (e.startsWith("event:")) o = e.replace(/^event:\s*/, "");
							else if (e.startsWith("id:")) u = e.replace(/^id:\s*/, "");
							else if (e.startsWith("retry:")) {
								let t = Number.parseInt(e.replace(/^retry:\s*/, ""), 10);
								Number.isNaN(t) || (s = t);
							}
							let c, l = !1;
							if (a.length) {
								let e = a.join("\n");
								try {
									c = JSON.parse(e), l = !0;
								} catch {
									c = e;
								}
							}
							l && (r && await r(c), n && (c = await n(c))), t?.({
								data: c,
								event: o,
								id: u,
								retry: s
							}), a.length && (yield c);
						}
					}
				} finally {
					p.removeEventListener("abort", d), a.releaseLock();
				}
				break;
			} catch (t) {
				if (e?.(t), a !== void 0 && f >= a) break;
				await d(Math.min(s * 2 ** (f - 1), o ?? 3e4));
			}
		}
	}() };
}, n = async (e, t) => {
	let n = typeof t == "function" ? await t(e) : t;
	if (n) return e.scheme === "bearer" ? `Bearer ${n}` : e.scheme === "basic" ? `Basic ${btoa(n)}` : n;
}, r = (e) => {
	switch (e) {
		case "label": return ".";
		case "matrix": return ";";
		case "simple": return ",";
		default: return "&";
	}
}, i = (e) => {
	switch (e) {
		case "form": return ",";
		case "pipeDelimited": return "|";
		case "spaceDelimited": return "%20";
		default: return ",";
	}
}, a = (e) => {
	switch (e) {
		case "label": return ".";
		case "matrix": return ";";
		case "simple": return ",";
		default: return "&";
	}
}, o = ({ allowReserved: e, explode: t, name: n, style: a, value: o }) => {
	if (!t) {
		let t = (e ? o : o.map((e) => encodeURIComponent(e))).join(i(a));
		switch (a) {
			case "label": return `.${t}`;
			case "matrix": return `;${n}=${t}`;
			case "simple": return t;
			default: return `${n}=${t}`;
		}
	}
	let c = r(a), l = o.map((t) => a === "label" || a === "simple" ? e ? t : encodeURIComponent(t) : s({
		allowReserved: e,
		name: n,
		value: t
	})).join(c);
	return a === "label" || a === "matrix" ? c + l : l;
}, s = ({ allowReserved: e, name: t, value: n }) => {
	if (n == null) return "";
	if (typeof n == "object") throw Error("Deeply-nested arrays/objects aren’t supported. Provide your own `querySerializer()` to handle these.");
	return `${t}=${e ? n : encodeURIComponent(n)}`;
}, c = ({ allowReserved: e, explode: t, name: n, style: r, value: i, valueOnly: o }) => {
	if (i instanceof Date) return o ? i.toISOString() : `${n}=${i.toISOString()}`;
	if (r !== "deepObject" && !t) {
		let t = [];
		Object.entries(i).forEach(([n, r]) => {
			t = [
				...t,
				n,
				e ? r : encodeURIComponent(r)
			];
		});
		let a = t.join(",");
		switch (r) {
			case "form": return `${n}=${a}`;
			case "label": return `.${a}`;
			case "matrix": return `;${n}=${a}`;
			default: return a;
		}
	}
	let c = a(r), l = Object.entries(i).map(([t, i]) => s({
		allowReserved: e,
		name: r === "deepObject" ? `${n}[${t}]` : t,
		value: i
	})).join(c);
	return r === "label" || r === "matrix" ? c + l : l;
}, l = /\{[^{}]+\}/g, u = ({ path: e, url: t }) => {
	let n = t, r = t.match(l);
	if (r) for (let t of r) {
		let r = !1, i = t.substring(1, t.length - 1), a = "simple";
		i.endsWith("*") && (r = !0, i = i.substring(0, i.length - 1)), i.startsWith(".") ? (i = i.substring(1), a = "label") : i.startsWith(";") && (i = i.substring(1), a = "matrix");
		let l = e[i];
		if (l == null) continue;
		if (Array.isArray(l)) {
			n = n.replace(t, o({
				explode: r,
				name: i,
				style: a,
				value: l
			}));
			continue;
		}
		if (typeof l == "object") {
			n = n.replace(t, c({
				explode: r,
				name: i,
				style: a,
				value: l,
				valueOnly: !0
			}));
			continue;
		}
		if (a === "matrix") {
			n = n.replace(t, `;${s({
				name: i,
				value: l
			})}`);
			continue;
		}
		let u = encodeURIComponent(a === "label" ? `.${l}` : l);
		n = n.replace(t, u);
	}
	return n;
}, d = ({ baseUrl: e, path: t, query: n, querySerializer: r, url: i }) => {
	let a = i.startsWith("/") ? i : `/${i}`, o = (e ?? "") + a;
	t && (o = u({
		path: t,
		url: o
	}));
	let s = n ? r(n) : "";
	return s.startsWith("?") && (s = s.substring(1)), s && (o += `?${s}`), o;
}, f = ({ allowReserved: e, array: t, object: n } = {}) => (r) => {
	let i = [];
	if (r && typeof r == "object") for (let a in r) {
		let l = r[a];
		if (l != null) if (Array.isArray(l)) {
			let n = o({
				allowReserved: e,
				explode: !0,
				name: a,
				style: "form",
				value: l,
				...t
			});
			n && i.push(n);
		} else if (typeof l == "object") {
			let t = c({
				allowReserved: e,
				explode: !0,
				name: a,
				style: "deepObject",
				value: l,
				...n
			});
			t && i.push(t);
		} else {
			let t = s({
				allowReserved: e,
				name: a,
				value: l
			});
			t && i.push(t);
		}
	}
	return i.join("&");
}, p = (e) => {
	if (!e) return "stream";
	let t = e.split(";")[0]?.trim();
	if (t) {
		if (t.startsWith("application/json") || t.endsWith("+json")) return "json";
		if (t === "multipart/form-data") return "formData";
		if ([
			"application/",
			"audio/",
			"image/",
			"video/"
		].some((e) => t.startsWith(e))) return "blob";
		if (t.startsWith("text/")) return "text";
	}
}, m = (e, t) => t ? !!(e.headers.has(t) || e.query?.[t] || e.headers.get("Cookie")?.includes(`${t}=`)) : !1, h = async ({ security: e, ...t }) => {
	for (let r of e) {
		if (m(t, r.name)) continue;
		let e = await n(r, t.auth);
		if (!e) continue;
		let i = r.name ?? "Authorization";
		switch (r.in) {
			case "query":
				t.query ||= {}, t.query[i] = e;
				break;
			case "cookie":
				t.headers.append("Cookie", `${i}=${e}`);
				break;
			default:
				t.headers.set(i, e);
				break;
		}
	}
}, g = (e) => d({
	baseUrl: e.baseUrl,
	path: e.path,
	query: e.query,
	querySerializer: typeof e.querySerializer == "function" ? e.querySerializer : f(e.querySerializer),
	url: e.url
}), _ = (e, t) => {
	let n = {
		...e,
		...t
	};
	return n.baseUrl?.endsWith("/") && (n.baseUrl = n.baseUrl.substring(0, n.baseUrl.length - 1)), n.headers = v(e.headers, t.headers), n;
}, v = (...e) => {
	let t = new Headers();
	for (let n of e) {
		if (!n || typeof n != "object") continue;
		let e = n instanceof Headers ? n.entries() : Object.entries(n);
		for (let [n, r] of e) if (r === null) t.delete(n);
		else if (Array.isArray(r)) for (let e of r) t.append(n, e);
		else r !== void 0 && t.set(n, typeof r == "object" ? JSON.stringify(r) : r);
	}
	return t;
}, y = class {
	constructor() {
		this._fns = [];
	}
	clear() {
		this._fns = [];
	}
	getInterceptorIndex(e) {
		return typeof e == "number" ? this._fns[e] ? e : -1 : this._fns.indexOf(e);
	}
	exists(e) {
		let t = this.getInterceptorIndex(e);
		return !!this._fns[t];
	}
	eject(e) {
		let t = this.getInterceptorIndex(e);
		this._fns[t] && (this._fns[t] = null);
	}
	update(e, t) {
		let n = this.getInterceptorIndex(e);
		return this._fns[n] ? (this._fns[n] = t, e) : !1;
	}
	use(e) {
		return this._fns = [...this._fns, e], this._fns.length - 1;
	}
}, b = () => ({
	error: new y(),
	request: new y(),
	response: new y()
}), x = f({
	allowReserved: !1,
	array: {
		explode: !0,
		style: "form"
	},
	object: {
		explode: !0,
		style: "deepObject"
	}
}), S = { "Content-Type": "application/json" }, C = (t = {}) => ({
	...e,
	headers: S,
	parseAs: "auto",
	querySerializer: x,
	...t
}), w = ((e = {}) => {
	let n = _(C(), e), r = () => ({ ...n }), i = (e) => (n = _(n, e), r()), a = b(), o = async (e) => {
		let t = {
			...n,
			...e,
			fetch: e.fetch ?? n.fetch ?? globalThis.fetch,
			headers: v(n.headers, e.headers),
			serializedBody: void 0
		};
		return t.security && await h({
			...t,
			security: t.security
		}), t.requestValidator && await t.requestValidator(t), t.body && t.bodySerializer && (t.serializedBody = t.bodySerializer(t.body)), (t.serializedBody === void 0 || t.serializedBody === "") && t.headers.delete("Content-Type"), {
			opts: t,
			url: g(t)
		};
	}, s = async (e) => {
		let { opts: t, url: n } = await o(e), r = {
			redirect: "follow",
			...t,
			body: t.serializedBody
		}, i = new Request(n, r);
		for (let e of a.request._fns) e && (i = await e(i, t));
		let s = t.fetch, c = await s(i);
		for (let e of a.response._fns) e && (c = await e(c, i, t));
		let l = {
			request: i,
			response: c
		};
		if (c.ok) {
			if (c.status === 204 || c.headers.get("Content-Length") === "0") return t.responseStyle === "data" ? {} : {
				data: {},
				...l
			};
			let e = (t.parseAs === "auto" ? p(c.headers.get("Content-Type")) : t.parseAs) ?? "json", n;
			switch (e) {
				case "arrayBuffer":
				case "blob":
				case "formData":
				case "json":
				case "text":
					n = await c[e]();
					break;
				case "stream": return t.responseStyle === "data" ? c.body : {
					data: c.body,
					...l
				};
			}
			return e === "json" && (t.responseValidator && await t.responseValidator(n), t.responseTransformer && (n = await t.responseTransformer(n))), t.responseStyle === "data" ? n : {
				data: n,
				...l
			};
		}
		let u = await c.text(), d;
		try {
			d = JSON.parse(u);
		} catch {}
		let f = d ?? u, m = f;
		for (let e of a.error._fns) e && (m = await e(f, c, i, t));
		if (m ||= {}, t.throwOnError) throw m;
		return t.responseStyle === "data" ? void 0 : {
			error: m,
			...l
		};
	}, c = (e) => (t) => s({
		...t,
		method: e
	}), l = (e) => async (n) => {
		let { opts: r, url: i } = await o(n);
		return t({
			...r,
			body: r.body,
			headers: r.headers,
			method: e,
			url: i
		});
	};
	return {
		buildUrl: g,
		connect: c("CONNECT"),
		delete: c("DELETE"),
		get: c("GET"),
		getConfig: r,
		head: c("HEAD"),
		interceptors: a,
		options: c("OPTIONS"),
		patch: c("PATCH"),
		post: c("POST"),
		put: c("PUT"),
		request: s,
		setConfig: i,
		sse: {
			connect: l("CONNECT"),
			delete: l("DELETE"),
			get: l("GET"),
			head: l("HEAD"),
			options: l("OPTIONS"),
			patch: l("PATCH"),
			post: l("POST"),
			put: l("PUT"),
			trace: l("TRACE")
		},
		trace: c("TRACE")
	};
})(C({ baseUrl: "https://localhost:44389" }));
//#endregion
export { w as t };

//# sourceMappingURL=client.gen-BqX9kGvI.js.map