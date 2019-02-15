module.exports = {
  register () {
    this.routes = [
      {
        path: '/render-file-read',
        name: 'render-file-read',
        component: 'render-file-read'
      },
      {
        path: '/render-trigger-file-read',
        name: 'render-trigger-file-read',
        component: 'render-trigger-file-read'
      },
      {
        path: '/store',
        name: 'store',
        component: 'store'
      },
      {
        path: '/store-parent',
        name: 'store-parent',
        component: 'store-parent'
      },
      {
        path: '/data-vm',
        name: 'data-vm',
        component: 'data-vm'
      },
      {
        path: '/require',
        name: 'require',
        component: 'require'
      }
    ]

    this.menuItems = [
      {
        routeName: 'render-file-read',
        title: 'Render File Read'
      },
      {
        routeName: 'render-trigger-file-read',
        title: 'Render Trigger File Read'
      },
      {
        routeName: 'store',
        title: 'Store'
      },
      {
        routeName: 'store-parent',
        title: 'Store Parent'
      },
      {
        routeName: 'data-vm',
        title: 'Data VM'
      },
      {
        routeName: 'require',
        title: 'Require'
      }
    ]
  },

  getComponentPaths () {
    return {
      'render-file-read': 'pages/RenderFileRead.js',
      'render-trigger-file-read': 'pages/RenderTriggerFileRead.js',
      'store': 'pages/Store.js',
      'store-parent': 'pages/StoreParent.js',
      'data-vm': 'pages/DataVM.js',
      'require': 'pages/Require.js',
    }
  },

  getRoutes () {
    return this.routes
  },

  getMenuItems () {
    return this.menuItems
  }
}
