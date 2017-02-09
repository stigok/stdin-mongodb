#!/usr/bin/env node

const es = require('event-stream')
const execSync = require('child_process').execSync

const args = process.argv.splice(2)
const processName = args[0]
const db = args[1]

if (!processName) {
  console.error('Missing argument 1: processName')
  process.exit(1)
}

if (!db) {
  console.error('Missing argument 2: mongodb-connection-string')
  process.exit(1)
}

const clientId = execSync('uname -a')
console.log(`Using clientId ${clientId}`)

const api = require('./api')({
  clientId: clientId,
  db: db,
  autoConnect: true
})

process.stdin
  .pipe(es.split())
  .pipe(es.map((data, cb) => {
    if (data.length) {
      api
        .create({
          processName: processName,
          meta: args[1],
          data: data
        })
        .then(() => {
          console.log(`Saved message (${data.length} bytes)`)
          cb()
        })
        .catch(err => {
          console.error(err.toString())
          cb()
        })
    }
  }))
