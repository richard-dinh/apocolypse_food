const router = require('express').Router()
//bring in Foods and Villager model
const {Villager, Food} = require('../models')
//bring in jwt for token generation
const jwt = require('jsonwebtoken')
//bring in passport to lock routes
const passport = require('passport')
//get all villagers
router.get('/villagers', (request, response) => {
  Villager.find().populate('foods')
    .then(villagers => response.json(villagers))
    .catch(error => {
      console.error(error)
      response.sendStatus(400)
    })
})

//register a villager
router.post('/villagers/register', (request, response) => {
  Villager.register( new Villager({
    username: request.body.username
  }), request.body.password, error => {
    if(error) throw error
    response.sendStatus(200)
  })
})


//villager login
router.post('/villagers/login', (request, response) => {
  Villager.authenticate()(request.body.username, request.body.password, (error, villager) => {
    if(error) throw error
    //will always send a response event if the user did not log in correctly
    response.json({
      //if logged in is successful, then isLogged is true, if not successful, then isLogged is passed as false
      isLoggedIn: !!villager,
      foods: villager.foods,
      villager: villager.username,
      id: villager._id,
      token: jwt.sign({id: villager._id}, process.env.SECRET)
    })
  })
})

//get one villager and all their food items
router.get('/villagers/:id', (request, response) => {
  Villager.findById(request.params.id).populate('foods')
    .then( villager => response.json(villager) )
    .catch(error => {
      console.error(error)
      response.sendStatus(400)
    })
})

//create a villager
router.post('/villagers', (request, response) => {
  Villager.create(request.body)
  .then( () => response.sendStatus(200))
  .catch( error => {
    console.error(error)
    response.sendStatus(400)
  })
})


//route for letting villager add items to their foods list. Authenticates if jwt is valid, if so, then it runs the route
router.put('/villagers/foods', passport.authenticate('jwt'),  (request, response) =>{
  Food.findOne({'name': request.body.name})
  .then( food => {
    Villager.findByIdAndUpdate(request.user._id, { $push: { foods: food._id } })
    .then( () => response.sendStatus(200))
    .catch( error => {
      console.error(error)
      response.sendStatus(400)
    })
  })
  .catch( error => {
    console.error(error)
    response.sendStatus(400)
  })
})

//delete item from list
router.delete('/villagers/:name', passport.authenticate('jwt'), (request, response) => {
  Food.findOne({'name': request.params.name})
  .then( food => {
    Villager.findByIdAndUpdate(request.user._id, {$pull : {foods: food._id}})
    .then( () => response.sendStatus(200))
    .catch( error => {
      console.error(error)
      response.sendStatus(400)
    })
  })
  .catch( error => {
    console.error(error)
    response.sendStatus(400)
  })
})

module.exports = router