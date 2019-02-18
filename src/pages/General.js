module.exports = {
  template: `
    <div>
      <h1>General</h1>
      <div>Computed: {{ testComputed }}</div>
      <div>Computed Trigger: {{ showThisComputed }}</div>

      <button v-if="!showThis" @click="triggerShowThis">Trigger</button>
    </div>
  `,

  data () {
    return {
      showThis: null
    }
  },

  computed: {
    testComputed () {
      return new Date()
    },

    showThisComputed () {
      return this.showThis === null ? '-' : (this.showThis ? 'working' : 'not working')
    }
  },

  methods: {
    triggerShowThis () {
      this.showThis = true
    }
  }
}
