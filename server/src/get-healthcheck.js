const fetch = require('node-fetch')
const isEqual = require('./is-equal')

async function get(url) {
  const response = await fetch(url, { method: 'GET', timeout: process.env.POLL_TIMEOUT } )
  return response
}

async function checkHealthCheck(response, service) {
  /**
   * Return early if status code is not 200
   */
  if (response.status !== 200) {
    return false
  }

  /**
   * Initial check for html pages
   */
  if (service.type === 'html') {
    return response.status === 200
  }

  const value = await response.text()

  if (service.type === 'json') {
    return isEqual(JSON.parse(value), service.healthyValue)
  }

  return isEqual(value, service.healthyValue)
}

async function getHealthCheck(service, io, callback) {
  let healthy = false

  try {
    const response = await get(service.url)
    healthy = await checkHealthCheck(response, service)
  } catch (error) {
    console.error('Server:', error.message)
    healthy = false
  }

  callback({ serviceName: service.name, healthy }, io)
}

module.exports = getHealthCheck
