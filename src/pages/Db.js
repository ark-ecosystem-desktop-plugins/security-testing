module.exports = {
  template: `
    <div class="bg-theme-feature rounded-lg p-10">
      <h1>DB</h1>
      <div class="text-theme-feature">Can I access IndexedDB?: {{ testIndexedDB }}</div>
    </div>
  `,

  computed: {
    testIndexedDB () {
      return '?'
    }
  }
}
