const {model, Schema} = require('mongoose')

const villagerSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  foods:[{
    type: Schema.Types.ObjectId,
    ref: 'food'
  }]
})

//add plugin for user authentication

module.exports = model('villager', villagerSchema)