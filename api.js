const LogItem = require('./log-item.model')
const mongoose = require('mongoose')
const Promise = require('bluebird')
mongoose.Promise = Promise

function API (options) {
  this.options = Object.assign({
    clientId: null,
    db: null
  }, options)
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
