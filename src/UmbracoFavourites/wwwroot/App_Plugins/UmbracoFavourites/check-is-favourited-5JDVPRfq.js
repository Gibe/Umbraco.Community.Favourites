import { c as o } from "./client.gen-Ce7o8kG8.js";
async function c(r) {
  if (!r) return !1;
  const { data: e, error: a } = await o.get({
    url: "/umbraco/favourites/api/v1/favourites",
    security: [{ scheme: "bearer", type: "http" }]
  });
  return !a && Array.isArray(e) && e.some((t) => t.nodeKey === r);
}
export {
  c
};
//# sourceMappingURL=check-is-favourited-5JDVPRfq.js.map
