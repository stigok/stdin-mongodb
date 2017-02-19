const LogItem = require('./log-item.model')
const mongoose = require('mongoose')
const Promise = require('bluebird')
mongoose.Promise = Promise

function API (options) {
  this.options = Object.assign({
    clientId: null,
    db: null,
    autoConnect: true
  }, options)

  // if (this.options.autoConnect) {
  //   this.connect()
  //     .then(function () {
  //       console.log('Constructor connect success', arguments)
  //     })
  //     .tap(() => console.log('Connected to database', this.options.db))
  //     .catch(() => console.error('Failed to connect to database', this.options.db))
  // }
}

API.prototype.connect = function () {
  const mongoOptions = {
    promiseLibrary: Promise
  }

  const thenable = mongoose.connect(this.options.db, mongoOptions)
  return Promise.resolve(thenable)
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
