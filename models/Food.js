const {Schema, model} = require('mongoose')


module.exports = model('food', new Schema({
  name: {
    type: String,
    require: true
  }
  //consider adding a count later in the event supplies run out
}))
