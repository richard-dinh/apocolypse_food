const router = require('express').Router()

router.use('/api', require('./foodRoutes.js'))
router.use('/api', require('./villagerRoutes.js'))

module.exports = router