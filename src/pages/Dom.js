module.exports = {
  template: `
    <div>
      <h1>DOM</h1>

      <button v-if="!showTrigger" @click="triggerMethod">Trigger</button>

      <div style="margin-top: 2rem">
        <h2>Can I access external DOM information?</h2>
        <span v-if="readContent" style="background-color: red; color: white">{{ readContent }}</span>
        <span v-if="!readContent" style="background-color: green; color: white">NO</span>
      </div>

      <div style="margin-top: 2rem">
        <h2>Can I access external DOM information <strong>on render</strong>?</h2>
        <span v-if="titleRender" style="background-color: red; color: white">{{ titleRender }}</span>
        <span v-if="!titleRender" style="background-color: green; color: white">NO</span>

        <div style="visibility: hidden">
          {{ (typeof document !== 'undefined' ? titleRender = document.querySelector('.ProfileAvatar').title : titleRender = false) }}
        </div>
      </div>

      <div v-if="showTrigger" style="margin-top: 2rem">
        <h2>Can I access external DOM information <strong>on render trigger</strong>?</h2>
        <span v-if="titleRenderTrigger" style="background-color: red; color: white">{{ titleRenderTrigger }}</span>
        <span v-if="!titleRenderTrigger" style="background-color: green; color: white">NO</span>

        <div style="visibility: hidden">
          {{ (typeof document !== 'undefined' ? titleRenderTrigger = document.querySelector('.ProfileAvatar').title : titleRenderTrigger = false) }}
        </div>
      </div>

      <div style="margin-top: 2rem">
        <h2>Can I add content to the external DOM?</h2>
        <span v-if="appendToBottom" style="background-color: red; color: white">{{ appendToBottom }}</span>
        <span v-if="!appendToBottom" style="background-color: green; color: white">NO</span>
      </div>

      <div style="margin-top: 2rem">
        <h2>Can I modify existing nodes of the external DOM?</h2>
        <span v-if="alterAvatar" style="background-color: red; color: white">{{ alterAvatar }}</span>
        <span v-if="!alterAvatar" style="background-color: green; color: white">NO</span>
      </div>

      <div style="margin-top: 2rem">
        <h2>Can I remove existing nodes of the external DOM?</h2>
        <span v-if="removeSidebarItem" style="background-color: red; color: white">{{ removeSidebarItem }}</span>
        <span v-if="!removeSidebarItem" style="background-color: green; color: white">NO</span>
      </div>

      <div style="margin-top: 2rem">
        <h2>Can I listen to events of the external DOM when I'm on the plugin page?</h2>
        <h3>{{ spyClicks }}</h3>
        <span v-if="currency" style="background-color: red; color: white">
          Yes, I know where you are clicking and that you changed your currency to {{ currency }}
        </span>
        <span v-if="!currency" style="background-color: green; color: white">
          I'm a good plugin, and I'm not doing anything dangerous ;)
        </span>
      </div>

      <div style="margin-top: 2rem">
        <h2>Can I listen to events of the external DOM when I'm not on the plugin page?</h2>
        <h3>{{ spyInputs }}</h3>
        <span style="background-color: green; color: white">
          I'm a good plugin, and I'm not doing anything dangerous ;)
        </span>
      </div>

      <div style="margin-top: 2rem">
        <h2>Can I listen to events of the external DOM after disabling the plugin?</h2>
        <h3>{{ spyAfterDisabled }}</h3>
        <span style="background-color: green; color: white">
          I'm a good plugin, and I'm not doing anything dangerous ;)
        </span>
      </div>
    </div>
  `,

  data () {
    return {
      currency: null,
      titleRender: null,
      showTrigger: false
    }
  },

  computed: {
    readContent () {
      return document.querySelector('.ProfileAvatar').title
    },

    /* These computed properties produce side effects that are not detected by Vue */

    appendToBottom () {
      const $p = document.createElement('p')
      $p.innerHTML = '&nbsp;Ecosystem amazing team'
      document.body.querySelector('footer').appendChild($p)

      return 'Yes, check the bottom'
    },

    alterAvatar () {
      this.$nextTick(() => {
        // This example doesn't work always without altering the parent element
        const $container = document.querySelector('.AppSidemenu__avatar__container')
        $container.innerHTML = ''

        const $avatar = document.querySelector('.AppSidemenu__avatar')
        if ($avatar) {
          $avatar.style.backgroundImage = "url('https://media.tenor.com/images/37a7adee5bca77ad3bf87aeeff5c6a1f/tenor.gif')"
          $avatar.style.backgroundSize = 'contain'
        }
      })

      return 'Yes, see the avatar'
    },

    removeSidebarItem () {
      this.$nextTick(() => {
        const $container = document.querySelector('.AppSidemenu__container')
        $container.innerHTML = ''

        const $item = document.querySelector('.MenuNavigationItem[title=Announcements]')
        if ($item) {
          const $parent = $item.parentElement
          if ($parent) {
            $item.innerHTML = ''
            $parent.removeChild($item)
          }
        }
      })

      return 'Yes, the announcements button on the sidebar is gone forever'
    },

    /**
     * Listening to some nodes and iterating over all the `event.paths` break the application and dev tools,
     * so we check the target only
     */
    spyClicks () {
      document.getElementById('app').addEventListener('click', event => {
        const $button = event.target.querySelector('button')
        if ($button) {
          const $inner = $button.querySelector('button span span')
          if ($inner) {
            // `setTimeout` is disabled
            this.$nextTick(() => {
              const $items = document.querySelectorAll('.MenuDropdownItem__button')
              if ($items) {
                $items.forEach($item => {
                  $item.addEventListener('click', event => {
                    this.currency = event.target.innerText.trim()
                  })
                })
              }
            })
          }
        }
      })

      return 'Click on the settings and change the currency'
    },

    spyInputs () {
      document.getElementById('app').addEventListener('click', event => {
        this.$nextTick(() => {
          const $input = document.querySelector('input[name=passphrase]')
          if ($input) {
            $input.addEventListener('paste', event => {
              const pasted = event.clipboardData.getData('text')
              console.info(`While I'm sending all your funds to Juan, please consider not using "${pasted}" anymore`)
            })
          }
        })
      })

      return 'Go to a wallet, paste your passphrase to send a transfer, and see the console'
    },

    spyAfterDisabled () {
      document.getElementById('app').addEventListener('click', event => {
        console.info(`We're doomed...`)
      })

      return 'Disable the plugin, go to the dashboard, and see the console'
    }
  },

  methods: {
    triggerMethod () {
      this.showTrigger = true
    }
  }
}
