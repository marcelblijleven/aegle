class ResponseError extends Error {
  constructor(error, duration) {
    super(error)
    this.message = error.message
    this.duration = duration
  }
}

function getContentType(response) {
  return response.headers.get('Content-Type') || ''
}

function createResponseObject(response, data, startTime) {
  const endTime = new Date()
  return { status: response.status, ok: response.ok, data: data, duration: endTime - startTime }
}

function createError(error, startTime) {
  const endTime = new Date()
  const duration = endTime - startTime
  return new ResponseError(error, duration)
}

function addResponseTimesToService(service, response) {
  service.responseTimes.push(response.duration)

  if (service.responseTimes.length > 20) {
    service.responseTimes = service.responseTimes.slice(1)
  }
}

module.exports = {
  getContentType,
  createResponseObject,
  createError,
  ResponseError,
  addResponseTimesToService
}
