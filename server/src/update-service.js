const { updateStore } = require('./store')
const updateWebhook = require('./update-webhook')

function updateService(result, io) {
  if (result) {
    const status = result.healthy ? 'healthy' : 'unhealthy'
    updateStore(result.serviceName, status)
    io.sockets.emit('update service', result)

    if (!result.healthy && process.env.WEBHOOK) {
      updateWebhook(`Service '${result.serviceName} is not healthy'`)
    }

    return
  }

  console.info(`Server: received request to update service, but no update status.`)
}

module.exports = updateService
