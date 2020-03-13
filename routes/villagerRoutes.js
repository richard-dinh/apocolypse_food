const router = require('express').Router()
const {Villager} = require('../models')

//get all villagers
router.get('/villagers', (request, response) => {
  Villager.find().populate('foods')
    .then(villagers => response.json(villagers))
    .catch(error => {
      console.error(error)
      response.sendStatus(400)
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