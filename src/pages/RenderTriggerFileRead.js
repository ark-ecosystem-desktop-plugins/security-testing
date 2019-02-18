module.exports = {
  template: `
    <div>
      <h1>Render: Trigger File Read</h1>

      <button v-if="!showThis" @click="testMethod">Trigger</button>

      <div v-if="showThis">
        <div>Read /etc/passwd</div>
          <pre>{{ typeof require !== 'undefined' && require('fs') ? require('fs').readFileSync('/etc/passwd') : 'NOPE' }}</pre>
        </div>
      </div>
    </div>
  `,

  data () {
    return {
      showThis: false
    }
  },

  methods: {
    testMethod: function () {
      this.showThis = true
      try {
        const fs = require('fs')
        console.log('testMethod: fs read /etc/passwd', fs.readFileSync('/etc/passwd'))
      } catch (err) {
        console.log('testMethod: fs error', err)
      }
    }
  }
}
