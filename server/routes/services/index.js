const router = require('express').Router()
const services = require('./services')
const update = require('./update')

router.get('/', services)
router.post('/update', update)

module.exports = router
