export const manifests: Array<UmbExtensionManifest> = [
  {
    name: 'Favourites Menu Item',
    alias: 'Favourites.Menu.Item',
    type: 'menuItem',
    element: () => import('../sidebars/pins.element.js'),
    meta: {
      label: 'Favourites',
      icon: 'icon-pin',
      entityType: '',
      menus: [
        'Favourites.Menu'
      ]
    }
  },
];
