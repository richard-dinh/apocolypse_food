const {Schema, model} = require('mongoose')


module.exports = model('food', new Schema({
  name: {
    type: String,
    require: true
  }
}))
