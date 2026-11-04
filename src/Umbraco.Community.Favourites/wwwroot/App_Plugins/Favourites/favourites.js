import { t as e } from "./constants-DoKlF_Gs.js";
//#region src/entrypoints/manifest.ts
var t = [{
	name: "Favourites Entrypoint",
	alias: "Favourites.Entrypoint",
	type: "backofficeEntryPoint",
	js: () => import("./entrypoint-DTR7qGBw.js")
}], n = [{
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
	}, { alias: "Favourites.Condition.HasPermission" }]
}], r = [{
	name: "Favourites Sidebar Menu",
	alias: "Favourites.Menu",
	type: "menu",
	meta: { label: "Favourites" }
}], i = [{
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
}], a = [{
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
	conditions: [
		{ alias: "Umb.Condition.EntityIsNotTrashed" },
		{ alias: "Favourites.Condition.IsNotFavourited" },
		{ alias: "Favourites.Condition.HasPermission" }
	]
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
	conditions: [
		{ alias: "Umb.Condition.EntityIsNotTrashed" },
		{ alias: "Favourites.Condition.IsFavourited" },
		{ alias: "Favourites.Condition.HasPermission" }
	]
}], o = [
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
	},
	{
		name: "Favourites Has Permission Condition",
		alias: "Favourites.Condition.HasPermission",
		type: "condition",
		api: () => import("./has-permission.condition-6Rd-XAAj.js")
	}
], s = [{
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
		},
		{ alias: "Favourites.Condition.HasPermission" }
	]
}], c = [{
	type: "entityUserPermission",
	alias: "Favourites.EntityUserPermission.Use",
	name: "Favourites Use Permission",
	forEntityTypes: ["document"],
	meta: {
		verbs: [e],
		label: "Favourites",
		description: "Allow the user to add, remove and view their favourites"
	}
}], l = [
	...t,
	...n,
	...r,
	...i,
	...a,
	...o,
	...s,
	...c
];
//#endregion
export { l as manifests };

//# sourceMappingURL=favourites.js.map