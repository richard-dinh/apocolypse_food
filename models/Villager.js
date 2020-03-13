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
villagerSchema.plugin(require('passport-local-mongoose'))

module.exports = model('villager', villagerSchema)