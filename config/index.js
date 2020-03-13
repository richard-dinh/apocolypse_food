const {connect} = require('mongoose')

module.exports = connect( process.env.MONGODB_URI || process.env.LOCAL_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})