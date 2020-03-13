const express = require('express')
const {join} = require('path')
//bring in dotenv
require('dotenv').config()
//bring in passport
const passport = require('passport')
//bring in a Strategy for local
const LocalStrategy = require('passport-local').Strategy
//bring in Strategy for deployment using a Json Web Token
const { Strategy: JWTStrategy, ExtractJwt} = require('passport-jwt')

//bring in Villager model to create a secret
const { Villager } = require('./models')

const app = express()

//bring in middleware for express
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static(join(__dirname, 'public')))
//bring in middleware for passport
app.use(passport.initialize())
app.use(passport.session())

//passport usage for local authentication
passport.use(new LocalStrategy(Villager.authenticate()))
passport.serializeUser(Villager.serializeUser())
passport.deserializeUser(Villager.deserializeUser())

//passport usage for jwt authentication
passport.use(new JWTStrategy({
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET
}, (jwtPayload, cb) => Villager.findById(jwtPayload.id)
  .then( villager => cb(null, villager ))
  .catch( error => cb(error))
))
//bring in routes
app.use(require('./routes'))

require('./config')
  .then( () => app.listen(process.env.PORT || 3000))
  .catch( error => console.error(error))
