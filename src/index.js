module.exports = {
  register () {
    //
  },

  getComponentPaths () {
    return require('./component-paths')
  },

  getRoutes () {
    return require('./routes')
  },

  getMenuItems () {
    return require('./menu-items')
  }
}
