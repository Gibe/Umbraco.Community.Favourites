export const manifests: Array<UmbExtensionManifest> = [
  {
    type: 'menuItem',
    alias: 'cork.menu.item',
    name: 'cork pin item',
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
