module.exports = {
  template: `
    <div>
      <h1>Render: File Read</h1>
      <div>Read /etc/passwd</div>
      <pre>{{ typeof require !== 'undefined' && require('fs') ? require('fs').readFileSync('/etc/passwd') : 'NOPE' }}</pre>
    </div>
  `
}
