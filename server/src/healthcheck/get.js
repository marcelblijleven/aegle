const fetch = require('node-fetch')
const { getContentType, createResponseObject, createError } = require('./utils')

function get(url, options) {
  const startTime = new Date()

  return fetch(url, options).then(response => {
    if (response.ok) {
      const contentType = getContentType(response)

      // JSON
      if (contentType.includes('application/json')) {
        return response.json().then(json => {
          return createResponseObject(response, json, startTime)
        })
        .catch(error => {
          return Promise.reject(createError(error, startTime))
        })
      }

      // HTML
      if (contentType.includes('text/html')) {
        return response.text().then(html => {
          return createResponseObject(response, html, startTime)
        }).catch(error => {
          return Promise.reject(createError(error, startTime))
        })
      }

      // Plain text
      if (contentType.includes('text/plain')) {
        return response.text().then(text => {
          return createResponseObject(response, text, startTime)
        }).catch(error => {
          return Promise.reject(createError(error, startTime))
        })
      }

      return Promise.reject(createError(new Error('Invalid content type', contentType), startTime))
    }

    return Promise.reject(createError(new Error('Response status was not ok', response.status), startTime))
  })
  .catch(error => {
    return Promise.reject(createError(error, startTime))
  })
}

module.exports = get