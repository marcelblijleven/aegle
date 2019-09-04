const { Response } = require('node-fetch')
const utils = require('../../../src/healthcheck/utils')
const { advanceBy, advanceTo, clear } = require('jest-date-mock')

const getMockService = function() {
  return { responseTimes: [] }
}

describe('Healthcheck utils', function() {
  describe('getContentType', function() {
    test('Return the content type if it exists', function() {
      const mockResponse = new Response()
      const contentType = 'application/json'
      mockResponse.headers.set('Content-Type', contentType)
      const type = utils.getContentType(mockResponse)
      expect(type).toEqual(contentType)
    })

    test('Return the content type if it exists', function() {
      const mockResponse = new Response()
      const type = utils.getContentType(mockResponse)
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
      const value = utils.createResponseObject(mockResponse, data, startTime)
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
      const value = utils.createError(mockError, startTime)

      expect(value instanceof utils.ResponseError).toEqual(true)

      expect(value.duration).toEqual(1000)

      // Reset new Date
      clear()
      jest.resetAllMocks()
    })

    test('Correctly map error message to error instance', function() {
      const mockError = new Error('Test error')
      const value = utils.createError(mockError, new Date())
      expect(value.message).toEqual('Test error')
    })
  })

  describe('addResponseTimesToService', function() {
    test('Adding duration to response times', function() {
      const service = getMockService()
      const response = { duration: 1000 }
      utils.addResponseTimesToService(service, response)
      expect(service.responseTimes.length).toEqual(1)
      expect(service.responseTimes[0]).toEqual(1000)
    })

    test('Adding the 21st item to response times', function() {
      const service = getMockService()
      const response = { duration: 1000 }
      service.responseTimes = [0].concat(Array(19).fill(1000))
      expect(service.responseTimes.length).toEqual(20)
      utils.addResponseTimesToService(service, response)
      expect(service.responseTimes.length).toEqual(20)
      expect(service.responseTimes[0]).not.toEqual(0)
    })
  })
})