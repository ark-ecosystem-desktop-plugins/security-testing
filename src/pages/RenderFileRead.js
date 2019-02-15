module.exports = {
  template: `
    <div>
      <h1>Render: File Read</h1>
      <div>Read /etc/passwd</div>
      <pre>{{ require('fs').readFileSync('/etc/passwd') }}</pre>
    </div>
  `
}
