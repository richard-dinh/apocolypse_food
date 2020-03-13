const router = require('express').Router()
const {Villager} = require('../models')
//bring in jwt
const jwt = require('jsonwebtoken')
//get all villagers
// router.get('/villagers', (request, response) => {
//   Villager.find().populate('foods')
//     .then(villagers => response.json(villagers))
//     .catch(error => {
//       console.error(error)
//       response.sendStatus(400)
//     })
// })

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
    response.json({
      isLoggedIn: !!villager,
      foods: villager.foods,
      villager: villager.username,
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

module.exports = router