const axios = require('axios')
const isEqual = require('./is-equal')

// Measure axios response times
axios.interceptors.request.use(function (config) {
  config.metadata = { startTime: new Date()}
  return config
}, function (error) {
  return Promise.reject(error)
})

axios.interceptors.response.use(function (response) {
  response.config.metadata.endTime = new Date()
  response.duration = response.config.metadata.endTime - response.config.metadata.startTime
  return response;
}, function (error) {
  error.config.metadata.endTime = new Date();
  error.duration = error.config.metadata.endTime - error.config.metadata.startTime;
  return Promise.reject(error);
});

async function get(url) {
  const response = await axios.get(url, { timeout: process.env.POLL_TIMEOUT || 15 * 1000 })
  return response
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

  const value = await response.data

  if (service.type === 'json') {
    return isEqual(value, service.healthyValue)
  }

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
