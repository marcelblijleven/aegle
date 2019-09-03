const fetch = require('node-fetch')
const isEqual = require('./is-equal')

async function get(url) {
  const startTime = new Date()
  return fetch(url, { timeout: process.env.POLL_TIMEOUT || 15 * 1000 })
    .then(response => {
      const endTime = new Date()
      response.duration = endTime - startTime
      return response.text().then(text => {
        try {
          response.data = JSON.parse(text)
        }
        catch (err) {
          response.data = text
        }
        return response
      })
    })
    .catch(error => {
      const endTime = new Date()
      error.duration = endTime - startTime
      return Promise.reject(error)
    })
}

function addResponseTimesToService(service, response) {
  service.responseTimes.push(response.duration)

  if (service.responseTimes.length > 20) {
    service.responseTimes = service.responseTimes.slice(1)
  }
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

  const value = response.data

  if (service.type === 'json') {
    console.log(JSON.parse(value), service.healthyValue)
    return isEqual(JSON.parse(value), service.healthyValue)
  }
  console.log(value, service.healthyValue)
  return isEqual(value, service.healthyValue)
}

async function getHealthCheck(service, io, callback) {
  let healthy = false
  let response
  let error

  try {
    response = await get(service.url)
    healthy = await checkHealthCheck(response, service)
  } catch (err) {
    error = err
    console.error('Server:', err.message)
    healthy = false
  }

  addResponseTimesToService(service, response || error)

  service.status = healthy ? 'healthy' : 'unhealthy'
  service.updatedAt = new Date().toLocaleString('nl-NL')

  callback({ service }, io)
}

module.exports = getHealthCheck
