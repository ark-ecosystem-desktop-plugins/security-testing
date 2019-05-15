module.exports = {
  template: `
    <div class="bg-theme-feature rounded-lg p-10">
      <h1>Render: File Read</h1>
      <div>Read /etc/passwd</div>
      <pre>{{ typeof require !== 'undefined' && require('fs') ? require('fs').readFileSync('/etc/passwd') : 'NOPE' }}</pre>
    </div>
  `
}
