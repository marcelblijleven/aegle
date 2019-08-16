const services = require('../../services')

module.exports = function(req, res) {
  res.type('json')
  res.status(200)
  res.send(services)
}
