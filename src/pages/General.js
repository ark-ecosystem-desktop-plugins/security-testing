const add = require('../utils/add')

module.exports = {
  template: `
    <div class="bg-theme-feature rounded-lg p-10">
      <h1>General</h1>
      <div>Computed: {{ testComputed }}</div>
      <div>Computed array: {{ testComputedArray[0] }}</div>
      <div>Computed object: {{ testComputedObject.key }}</div>
      <div>Computed Trigger: {{ showThisComputed }}</div>
      <div>Require Local: {{ requireLocal }}</div>

      <button v-if="!showThis" @click="triggerShowThis">Trigger</button>

      <div>
        <h2>For loops</h2>
        <div
          v-for="value in testComputedArray"
        >
          {{ value }}
        </div>

        <div
          v-for="(value, key) in testComputedObject"
          :key="key"
        >
          {{ key }}: {{ value }}
        </div>
      </div>
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

    testComputedArray () {
      return ['one', 'dos', 'san']
    },

    testComputedObject () {
      return {
        key: 'value',
        other: 'another'
      }
    },

    showThisComputed () {
      return this.showThis === null ? '-' : (this.showThis ? 'working' : 'not working')
    },

    requireLocal () {
      try {
        return add(1, 2) === 3 ? 'working' : 'not working'
      } catch (error) {
        return 'not working'
      }
    }
  },

  methods: {
    triggerShowThis () {
      this.showThis = true
    }
  }
}
