const https = require('https')
const get = require('./get')
const utils = require('./utils')
const isEqual = require('../is-equal')

async function getHealthCheck(service, io, callback) {
  const options = { timeout: process.env.POLL_TIMEOUT || 15 * 1000 }
  let healthy = false
  let response
  let error
  
  if (service.agent !== undefined) {
    agent = new https.Agent(service.agent)
    options.agent = agent
  }

  try {
    const expectContent = service.healthyValue !== undefined && service.healthyValue.length > 0
    response = await get(service.url, options, expectContent)

    if (response.ok && (service.healthyValue === undefined || service.healthyValue === '')) {
      healthy = true
    } else {
      healthy = isEqual(response.data, service.healthyValue)
    }
  }
  catch(err) {
    error = err
    console.error('Server:', err.message)
  }

  utils.addResponseTimesToService(service, response || error)
  service.status = healthy ? 'healthy' : 'unhealthy'
  service.updatedAt = new Date().toLocaleString('nl-NL')
  
  callback({ service }, io)
}

module.exports = getHealthCheck
