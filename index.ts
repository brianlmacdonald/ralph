const { exec } = require('child_process')
const pkg = require('./package.json')
const debug = require('debug')(`${pkg.name}:start`)

const run = () => {
  console.log('starting program')
  exec('DEBUG=* node dist/server')
}

run()
