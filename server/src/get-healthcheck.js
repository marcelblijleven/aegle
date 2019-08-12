const fetch = require('node-fetch')
const isEqual = require('./is-equal')

async function get(url) {
  const response = await fetch(url, { method: 'GET'} )
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

async function getHealthCheck(service) {
  let healthy = false

  try {
    const response = await get(service.url)
    healthy = await checkHealthCheck(response, service)
  } catch (error) {
    healthy = false
  }

  return { serviceName: service.name, healthy }
}

module.exports = getHealthCheck
