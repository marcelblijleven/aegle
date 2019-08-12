const fetch = require('node-fetch')
const isEqual = require('./is-equal')

async function getHealthCheck(service) {
  const serviceUrl = service.url
  const serviceName = service.name
  const healthyValue = service.healthyValue

  return fetch(serviceUrl, { method: 'GET' })
    .then((response) => {
      if (response.status !== 200) {
        throw Error(`Service ${serviceName} received status code ${response.status}`)
      }
      return response.json()
    })
    .then((json) => {
      return { serviceName, healthy: isEqual(json, healthyValue) }
    })
    .catch((error) => {
      console.error(error)
      return { serviceName, healthy: false }
    })
}

module.exports = getHealthCheck
