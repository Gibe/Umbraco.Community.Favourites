export const manifests: Array<UmbExtensionManifest> = [
  {
    type: 'menuItem',
    alias: 'cork.menu.item',
    name: 'cork pin item',
    element: () => import('../sidebars/pins.element.js'),
    meta: {
      label: 'Favourites',
      icon: 'icon-pin',
      entityType: '',
      menus: [
        'cork.menu'
      ]
    }
  },
];
