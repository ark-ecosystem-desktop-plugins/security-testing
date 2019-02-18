module.exports = {
  template: `
    <div>
      <h1>Access $parent.$store</h1>
      <div>Computed $parent.$store: {{ testComputed }}</div>
      <div>onMethod: {{ JSON.stringify(onMethod) }}</div>
      <div>onNextTick: {{ JSON.stringify(onNextTick) }}</div>
      <div>Render $parent.$store: {{ typeof $parent !== 'undefined' && $parent.$store ? $parent.$store.getters['profile/all'].length : 'false' }}</div>

      <button v-if="!showThis" @click="testMethod">Trigger</button>

      <div v-if="showThis">
        Trigger $parent.$store: {{ typeof $parent !== 'undefined' && $parent.$store ? $parent.$store.getters['profile/all'].length : 'false' }}
      </div>
    </div>
  `,

  data () {
    return {
      showThis: false,
      onMethod: null,
      onNextTick: null,
    }
  },

  computed: {
    testComputed () {
      return this.$parent && this.$parent.$store ? this.$parent.$store.getters['profile/all'].length : 'false'
    }
  },

  methods: {
    testMethod () {
      this.onMethod = this.hasOwnProperty('$store')
      this.$nextTick(function () {
        this.onNextTick = this.hasOwnProperty('$store')
      })
      this.showThis = true
    }
  }
}
