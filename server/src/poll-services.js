const getHealthCheck = require('./get-healthcheck')
const updateService = require('./update-service')

async function pollServices(services, io) {
  for (const service of services) {
    try {
      getHealthCheck(service, io, updateService)
    }
    catch(error) {
      console.error('Server: error in pollServices.', error.message)
    }
  }
}

module.exports = pollServices
