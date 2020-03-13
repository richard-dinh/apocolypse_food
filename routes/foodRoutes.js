const router = require('express').Router()
const { Food } = require('../models')

//get all foods
router.get('/foods', (request, response) => {
  Food.find()
  .then( foods => response.json(foods))
  .catch( error => {
    console.error(error)
    response.sendStatus(400)
  })
})

//post a food
router.post('/foods', (request, response) => {
  Food.create(request.body)
  .then( () => response.sendStatus(200))
  .catch( error => {
    console.error(error)
    response.sendStatus(400)
  })
})

//update a food
router.put('/foods/:id', (request, response) => {
  Food.findByIdAndUpdate(request.params.id, request.body)
  .then(() => response.sendStatus(200))
  .catch(error => {
    console.error(error)
    response.sendStatus(400)
  })
})

//delete a food
router.delete('/foods/:id', (request, response) => {
  Food.findByIdAndDelete(request.params.id)
  .then( () => response.sendStatus(200))
  .catch( error => {
    console.error(error)
    response.sendStatus(400)
  })
})

module.exports = router