const {Schema, model} = require('mongoose')


module.exports = model('item', new Schema({
  name: {
    type: String,
    require: true
  }
}))
