//#region src/entrypoints/manifest.ts
var e = [{
	name: "Favourites Entrypoint",
	alias: "Favourites.Entrypoint",
	type: "backofficeEntryPoint",
	js: () => import("./entrypoint-DTR7qGBw.js")
}], t = [{
	name: "Favourites Sidebar App",
	alias: "Favourites.Sidebar.App",
	type: "sectionSidebarApp",
	kind: "menuWithEntityActions",
	meta: { menu: "Favourites.Menu" },
	element: () => import("./sidebar.element-b8UiTVi0.js"),
	weight: 500,
	conditions: [{
		alias: "Umb.Condition.SectionAlias",
		match: "Umb.Section.Content"
	}]
}], n = [{
	name: "Favourites Sidebar Menu",
	alias: "Favourites.Menu",
	type: "menu",
	meta: { label: "Favourites" }
}], r = [{
	name: "Favourites Menu Item",
	alias: "Favourites.Menu.Item",
	type: "menuItem",
	element: () => import("./pins.element-q2c9bA6x.js"),
	meta: {
		label: "Favourites",
		icon: "icon-pin",
		entityType: "",
		menus: ["Favourites.Menu"]
	}
}], i = [{
	name: "Favourites Favourite Entity Action",
	alias: "Favourites.EntityAction.Favourite",
	type: "entityAction",
	kind: "default",
	weight: 10,
	api: () => import("./entityaction-Cdy_2Ugi.js"),
	forEntityTypes: ["document"],
	meta: {
		label: "Favourite",
		icon: "icon-pushpin"
	},
	conditions: [{ alias: "Umb.Condition.EntityIsNotTrashed" }, { alias: "Favourites.Condition.IsNotFavourited" }]
}, {
	name: "Favourites Unfavourite Entity Action",
	alias: "Favourites.EntityAction.Unfavourite",
	type: "entityAction",
	kind: "default",
	weight: 10,
	api: () => import("./unfavourite-entityaction-D6TlQ0qX.js"),
	forEntityTypes: ["document"],
	meta: {
		label: "Unfavourite",
		icon: "icon-pushpin"
	},
	conditions: [{ alias: "Umb.Condition.EntityIsNotTrashed" }, { alias: "Favourites.Condition.IsFavourited" }]
}], a = [
	{
		name: "Favourites Has Favourites Condition",
		alias: "Favourites.Condition.HasFavourites",
		type: "condition",
		api: () => import("./has-favourites.condition-D71QjaMC.js")
	},
	{
		name: "Favourites Is Favourited Condition",
		alias: "Favourites.Condition.IsFavourited",
		type: "condition",
		api: () => import("./is-favourited.condition-DVWvZAI7.js")
	},
	{
		name: "Favourites Is Not Favourited Condition",
		alias: "Favourites.Condition.IsNotFavourited",
		type: "condition",
		api: () => import("./is-not-favourited.condition-Co0-nvRd.js")
	}
], o = [{
	type: "workspaceAction",
	alias: "Favourites.WorkspaceAction.Pin",
	name: "Favourites Pin Workspace Action",
	api: () => import("./workspaceaction.action-D_bcnGOK.js"),
	element: () => import("./workspaceaction.element-C0e3pWDz.js"),
	weight: 100,
	conditions: [
		{
			alias: "Umb.Condition.WorkspaceAlias",
			match: "Umb.Workspace.Document"
		},
		{ alias: "Umb.Condition.EntityIsNotTrashed" },
		{
			alias: "Umb.Condition.WorkspaceEntityIsNew",
			match: !1
		}
	]
}], s = [
	...e,
	...t,
	...n,
	...r,
	...i,
	...a,
	...o
];
//#endregion
export { s as manifests };

//# sourceMappingURL=favourites.js.map