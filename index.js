#!/usr/bin/env node

const es = require('event-stream')
const execSync = require('child_process').execSync

const args = process.argv.splice(2)
const tag = args[0]
const db = args[1]
const debug = args.includes('--debug')

if (!tag) {
  console.error('Missing argument 1: tag')
  process.exit(1)
}

if (!db) {
  console.error('Missing argument 2: mongodb-connection-string')
  process.exit(1)
}

const clientId = execSync('printf "%s" "$(whoami)@$(hostname)"')
console.log(`Using clientId ${clientId}`)

const api = require('./api')({
  clientId: clientId,
  db: db,
  autoConnect: false
})

api.connect()
  .then(() => {
    console.log('Connected to database', db)
  })
  .catch((err) => {
    console.error(err.message)
    process.exit(1)
  })

process.stdin
  .pipe(es.split())
  .pipe(es.map((data, cb) => {
    if (data.length) {
      api
        .create({
          tag: tag,
          data: data
        })
        .then(() => {
          if (debug) console.log(`Saved message (${data.length} bytes)`)
          cb()
        })
        .catch(err => {
          console.error(err.toString())
          cb()
        })
    }
  }))
