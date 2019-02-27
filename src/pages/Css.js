module.exports = {
  template: `
    <div>
      <h1>CSS</h1>
      <div>
        <h2>Can I access CSS?</h2>
        <div class="bg-red">Classes: YES</div>
        <div style="background-color: var(--theme-button-special-choice)">Variables: YES</div>
      </div>

      <div style="margin-top: 2rem">
        <h2>Can I access body CSS (display: none)?</h2>
        <style>
          body {
            display: none !important;
          }
        </style>
        <span style="background-color: green; color: white">NO</span>
      </div>
    </div>
  `
}
