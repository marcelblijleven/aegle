const routes = require('express').Router()
const services = require('./services')
const healthcheck = require('./healthcheck')

routes.get('/', function(req, res) {
  res.type('json')
  res.status(200)
  res.send({aegle_server: 'connected'})
})

routes.use('/services', services)
routes.use('/healthcheck', healthcheck)

module.exports = routes
