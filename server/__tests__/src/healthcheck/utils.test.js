const { Response } = require('node-fetch')
const { getContentType, createResponseObject, createError, ResponseError } = require('../../../src/healthcheck/utils')
const { advanceBy, advanceTo, clear } = require('jest-date-mock')

describe('Healthcheck utils', function() {
  describe('getContentType', function() {
    test('Return the content type if it exists', function() {
      const mockResponse = new Response()
      const contentType = 'application/json'
      mockResponse.headers.set('Content-Type', contentType)
      const type = getContentType(mockResponse)
      expect(type).toEqual(contentType)
    })

    test('Return the content type if it exists', function() {
      const mockResponse = new Response()
      const type = getContentType(mockResponse)
      expect(type).toEqual('')
    })
  })

  describe('createResponseObject', function() {
    test('Correctly map values to the response object', function() {
      advanceTo(new Date(2019, 9, 3, 0, 0, 0, 0))
      const startTime = new Date()
      const data = { hello: 'World' }
      const mockResponse = new Response()
      mockResponse.status = 200

      const expected = { status: 200, data: { hello: 'World' }, duration: 1000 }
      advanceBy(1000) // Advance time by 1000ms
      const value = createResponseObject(mockResponse, data, startTime)
      expect(value).toEqual(expected)
      
      // Reset new Date
      clear()
      jest.resetAllMocks()
    })
  })

  describe('createError', function() {
    test('Correctly map duration to ResponseError instance', function() {
      advanceTo(new Date(2019, 9, 3, 0, 0, 0, 0))
      const mockError = new Error()
      const startTime = new Date()
      
      advanceBy(1000)
      const value = createError(mockError, startTime)

      expect(value instanceof ResponseError).toEqual(true)

      expect(value.duration).toEqual(1000)

      // Reset new Date
      clear()
      jest.resetAllMocks()
    })

    test('Correctly map error message to error instance', function() {
      const mockError = new Error('Test error')
      const value = createError(mockError, new Date())
      expect(value.message).toEqual('Test error')
    })
  })
})