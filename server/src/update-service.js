const { updateStore } = require('./store')
const updateWebhook = require('./update-webhook')

function updateService(result, io) {
  if (result) {
    const status = result.service.status
    updateStore(result.service.name, status)
    io.sockets.emit('service:update', result)

    if (!result.healthy && process.env.WEBHOOK) {
      updateWebhook(`Service '${result.service.name}' is not healthy`)
    }

    return
  }

  console.info(`Server: received request to update service, but no update status.`)
}

module.exports = updateService
