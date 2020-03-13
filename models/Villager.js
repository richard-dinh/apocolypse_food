const {model, Schema} = require('mongoose')

const villagerSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  items:[{
    type: Schema.Types.ObjectId,
    ref: 'item'
  }]
})

//add plugin for user authentication

module.exports = model('villager', villagerSchema)