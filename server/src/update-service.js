const { updateStore } = require('./store')

function updateService(result, io) {
  if (result) {
    const status = result.service.status
    updateStore(result.service.name, status)
    io.sockets.emit('service:update', result)

    return
  }

  console.info(`Server: received request to update service, but no update status.`)
}

module.exports = updateService
