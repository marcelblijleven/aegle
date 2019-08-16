const { updateStore } = require('./store')

function updateService(result, io) {
  if (result) {
    const status = result.healthy ? 'healthy' : 'unhealthy'
    updateStore(result.serviceName, status)
    io.sockets.emit('update service', result)
    return
  }

  console.info(`Server: received request to update service, but no update status.`)
}

module.exports = updateService
