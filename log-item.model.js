const mongoose = require('mongoose')
mongoose.Promise = require('bluebird')
const Schema = mongoose.Schema

const schemaOptions = {
  timestamps: true
}

const schema = new Schema({
  tag: {type: String, required: true},
  data: {type: Schema.Types.Mixed, required: true}
}, schemaOptions)

schema.add({
  clientId: {type: String, required: true}
})

const model = mongoose.model('LogItem', schema)

module.exports = model
