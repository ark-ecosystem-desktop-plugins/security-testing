module.exports = {
  template: `
    <div>
      <h1>Require</h1>
      <div>onCreated: {{ JSON.stringify(onCreated) }}</div>
      <div>onMounted: {{ JSON.stringify(onMounted) }}</div>
      <div>onMethod: {{ JSON.stringify(onMethod) }}</div>
      <div>onComputed:{{ testComputed }} {{ JSON.stringify(onComputed) }}</div>
      <div>onGlobalComputed:{{ globalComputed }} {{ JSON.stringify(onGlobalComputed) }}</div>
      <div>onRender: {{ JSON.stringify(onRender) }}</div>
      <div>onTriggerRender: {{ JSON.stringify(onTriggerRender) }}</div>
      <div>onNextTick: {{ JSON.stringify(onNextTick) }}</div>

      <button v-if="!showThis" @click="testMethod">Trigger</button>

      <div style="visibility: hidden">
        {{ (typeof require !== 'undefined' && require('fs') ? onRender = true : onRender = false) + JSON.stringify(onRender) }}
      </div>

      <div v-if="showThis" style="visibility: hidden">
        <br />
        trigger require: {{ (typeof require !== 'undefined' && require('fs') ? onTriggerRender = true : onTriggerRender = false) + JSON.stringify(onTriggerRender) }}
      </div>
    </div>
  `,

  data () {
    return {
      showThis: false,
      onCreated: null,
      onMounted: null,
      onComputed: null,
      onGlobalComputed: null,
      onMethod: null,
      onRender: null,
      onTriggerRender: null,
      onNextTick: null,
    }
  },

  created () {
    console.log('created', this)
    try {
      const fs = require('fs')
      fs.readFileSync('/etc/passwd')
      this.onCreated = true
    } catch (err) {
      this.onCreated = false
    }
  },

  mounted () {
    try {
      const fs = require('fs')
      fs.readFileSync('/etc/passwd')
      this.onMounted = true
    } catch (err) {
      this.onMounted = false
    }
  },

  computed: {
    testComputed: function () {
      console.log('testComputed this', this)
      try {
        const fs = require('fs')
        this.onComputed = true
      } catch (err) {
        this.onComputed = false
      }

      return ''
    },

    globalComputed: function () {
      try {
        const fs = global.require('fs')
        this.onGlobalComputed = true
      } catch (err) {
        this.onGlobalComputed = false
      }

      return ''
    }
  },

  methods: {
    testMethod: function () {
      this.showThis = true
      this.$nextTick(function () {
        try {
          const fs = require('fs')
          console.log('testComputed: fs read /etc/passwd', fs.readFileSync('/etc/passwd'))
          this.onNextTick = true
        } catch (err) {
          this.onNextTick = false
        }
      })
      try {
        const fs = require('fs')
        console.log('testMethod: fs read /etc/passwd', fs.readFileSync('/etc/passwd'))
        this.onMethod = true
      } catch (err) {
        this.onMethod = false
      }
    }
  }
}
