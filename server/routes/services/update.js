const services = require('../../services')
const pollServices = require('../../src/poll-services')

module.exports = function(req, res) {
  console.info('Server: updating services')
  const io = res.locals['socketio']
  pollServices(services, io)
  res.type('json')
  res.status(200)
  res.send({ status:'ok' })
}
