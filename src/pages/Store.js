module.exports = {
  template: `
    <div>
      <h1>Access $store</h1>
      <div>Computed $store: {{ testComputed }}</div>
      <div>onMethod: {{ JSON.stringify(onMethod) }}</div>
      <div>onNextTick: {{ JSON.stringify(onNextTick) }}</div>
      <div v-if="false">Render $store: {{ $store ? $store.getters['profile/all'].length : -1 }}</div>

      <button v-if="!showThis" @click="testMethod">Trigger</button>

      <div v-if="showThis">
        Trigger $store: {{ $store ? $store.getters['profile/all'].length : -1 }}
      </div>
    </div>
  `,

  data () {
    return {
      showThis: false,
      onMethod: null,
      onNextTick: null
    }
  },

  computed: {
    testComputed () {
      console.log('global', global)
      console.log('this', this)
      return this.$store ? this.$store.getters['profile/all'].length : -1
    }
  },

  methods: {
    testMethod () {
      this.onMethod = this.hasOwnProperty('$store')
      this.$nextTick(function () {
        console.log('Store nextTick', [...arguments])
        this.onNextTick = this.hasOwnProperty('$store')
      })
      this.showThis = true
    }
  }
}
