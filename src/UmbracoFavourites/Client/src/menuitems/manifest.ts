export const manifests: Array<UmbExtensionManifest> = [
  {
    name: 'Umbraco.Favourites Menu Item',
    alias: 'UmbracoFavourites.Menu.Item',
    type: 'menuItem',
    element: () => import('../sidebars/pins.element.js'),
    meta: {
      label: 'Favourites',
      icon: 'icon-pin',
      entityType: '',
      menus: [
        'UmbracoFavourites.Menu'
      ]
    }
  },
];
