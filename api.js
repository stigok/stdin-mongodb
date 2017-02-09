const LogItem = require('./log-item.model')
const mongoose = require('mongoose')
const Promise = require('bluebird')

function API (options) {
  this.options = Object.assign({
    clientId: null,
    db: null,
    autoConnect: true
  }, options)

  if (this.options.autoConnect) {
    this.connect()
  }
}

API.prototype.connect = function () {
  const mongoOptions = {
    promiseLibrary: Promise
  }
  mongoose.connect(this.options.db, mongoOptions, err => {
    if (err) {
      console.error('Failed to connect to database', this.options.db)
      console.error(err)
    } else {
      console.log('Connected to database', this.options.db)
    }
  })
}

API.prototype.create = function (obj) {
  obj.clientId = this.options.clientId
  const item = new LogItem(obj)
  const promise = item.save()
  return promise
}

module.exports = (...args) => {
  const api = new API(...args)
  return api
}
