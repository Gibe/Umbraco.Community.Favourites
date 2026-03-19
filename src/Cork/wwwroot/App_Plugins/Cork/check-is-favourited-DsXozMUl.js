import { c } from "./client.gen-Ce7o8kG8.js";
async function s(r) {
  if (!r) return !1;
  const { data: e, error: a } = await c.get({
    url: "/umbraco/cork/api/v1/favourites",
    security: [{ scheme: "bearer", type: "http" }]
  });
  return !a && Array.isArray(e) && e.some((t) => t.nodeKey === r);
}
export {
  s as c
};
//# sourceMappingURL=check-is-favourited-DsXozMUl.js.map
