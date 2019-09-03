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
  return { status: response.status, data: data, duration: endTime - startTime }
}

function createError(error, startTime) {
  const endTime = new Date()
  const duration = endTime - startTime
  return new ResponseError(error, duration)
}

module.exports = {
  getContentType,
  createResponseObject,
  createError,
  ResponseError
}
