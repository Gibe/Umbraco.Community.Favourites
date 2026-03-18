export const manifests: Array<UmbExtensionManifest> = [
  {
    name: 'Cork Menu Item',
    alias: 'Cork.Menu.Item',
    type: 'menuItem',
    element: () => import('../sidebars/pins.element.js'),
    meta: {
      label: 'Favourites',
      icon: 'icon-pin',
      entityType: '',
      menus: [
        'Cork.Menu'
      ]
    }
  },
];
