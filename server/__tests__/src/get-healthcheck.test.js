jest.mock('node-fetch')
const fetch = require('node-fetch')
const { Response } = jest.requireActual('node-fetch')
const { advanceTo, clear } = require('jest-date-mock')
const getHealthCheck = require('../../src/get-healthcheck')

const ioMock = {}
const updatedAt = new Date(2019, 7, 6, 0, 0, 0).toLocaleString('nl')
const { getJsonService, getHtmlService, getTextService } = require('../helpers/service-factory') 

describe('getHealthcheck', function () {
  beforeEach(() => {
    advanceTo(new Date(2019, 7, 6, 0, 0, 0))
  })

  afterEach(() => {
    jest.resetAllMocks()
    clear()
  })

  test('Succesfully calling endpoint with correct healthy value', async () => {
    const mockService = getJsonService()
    const callbackMock = jest.fn()
    const mockResponse = { 
      status: 200,
      data: { status: "Alive and kicking" },
      duration: 1000
    }

    // Setup mock response for the fetch call
    fetch.mockReturnValue(Promise.resolve(JSON.stringify(mockResponse)))

    await getHealthCheck(mockService, ioMock, callbackMock)
    const expected = {
      service: {
        healthyValue: {
          status: "Alive and kicking"
        },
        name: 'testService',
        status: 'healthy',
        type: 'json',
        updatedAt: updatedAt,
        url: 'http://localhost',
        responseTimes: [1000]
      }
    }

    expect(fetch).toHaveBeenCalledTimes(1)
    expect(fetch).toHaveBeenCalledWith(mockService.url, {
      timeout: 15000
    })
    expect(callbackMock).toHaveBeenCalledWith(expected, ioMock)
  })

  test('Succesfully calling endpoint with incorrect healthy value', async () => {
    const mockService = getJsonService()
    const callbackMock = jest.fn()

    // Setup mock response for the fetch call
    const mockResponse = {
      message: 'mock error',
      duration: 1000
    }
    fetch.mockReturnValue(Promise.reject(mockResponse))
    console.error = jest.fn()

    await getHealthCheck(mockService, ioMock, callbackMock)
    const expected = {
      service: {
        healthyValue: {
          status: "Alive and kicking"
        },
        name: 'testService',
        status: 'unhealthy',
        type: 'json',
        updatedAt: updatedAt,
        url: 'http://localhost',
        responseTimes: [1000]
      }
    }

    expect(fetch).toHaveBeenCalledTimes(1)
    expect(fetch).toHaveBeenCalledWith(mockService.url, {
      timeout: 15000
    })
    expect(callbackMock).toHaveBeenCalledWith(expected, ioMock)
  })

  test('Receiving a status code other than 200', async () => {
    const mockService = getJsonService()
    const callbackMock = jest.fn()
    const errorResponse503 = {
      status: 503,
      statusText: '503 Service unavailable',
      duration: 1000
    }
    fetch.mockReturnValue(Promise.resolve(errorResponse503))

    await getHealthCheck(mockService, ioMock, callbackMock)
    const expected = {
      service: {
        healthyValue: {
          status: "Alive and kicking"
        },
        name: 'testService',
        status: 'unhealthy',
        type: 'json',
        updatedAt: updatedAt,
        url: 'http://localhost',
        responseTimes: [1000]
      }
    }

    expect(fetch).toHaveBeenCalledTimes(1)
    expect(fetch).toHaveBeenCalledWith(mockService.url, {
      timeout: 15000
    })
    expect(callbackMock).toHaveBeenCalledWith(expected, ioMock)
  })

  test('Receiving a response for html pages', async () => {
    const mockService = getHtmlService()

    const callbackMock = jest.fn()
    const response = { 
      status: 200,
      data: '<h1>Hello</h1>',
      duration: 1000
    }

    fetch.mockReturnValue(Promise.resolve(response))
    await getHealthCheck(mockService, ioMock, callbackMock)
    const expected = {
      service: {
        healthyValue: '',
        name: 'htmlService',
        status: 'healthy',
        type: 'html',
        updatedAt: updatedAt,
        url: 'http://localhost',
        responseTimes: [1000]
      }
    }

    expect(fetch).toHaveBeenCalledTimes(1)
    expect(fetch).toHaveBeenCalledWith(mockService.url, {
      timeout: 15000
    })
    expect(callbackMock).toHaveBeenCalledWith(expected, ioMock)
  })

  test('Receiving a non 200 response for html pages', async () => {
    const mockService = getHtmlService()

    const callbackMock = jest.fn()

    const response = { 
      status: 404,
      data: '<h1>Hello</h1>',
      duration: 1000
    }

    fetch.mockReturnValue(Promise.resolve(response))
    await getHealthCheck(mockService, ioMock, callbackMock)
    const expected = {
      service: {
        healthyValue: '',
        name: 'htmlService',
        status: 'unhealthy',
        type: 'html',
        updatedAt: updatedAt,
        url: 'http://localhost',
        responseTimes: [1000]
      }
    }

    expect(fetch).toHaveBeenCalledTimes(1)
    expect(fetch).toHaveBeenCalledWith(mockService.url, {
      timeout: 15000
    })
    expect(callbackMock).toHaveBeenCalledWith(expected, ioMock)
  })

  test('Receiving a plain text response with healthy value', async () => {
    const mockService = getTextService()

    const callbackMock = jest.fn()

    const response = {
      status: 200,
      data: '200 OK',
      duration: 1000
    }
    fetch.mockReturnValue(Promise.resolve(response))
    await getHealthCheck(mockService, ioMock, callbackMock)
    const expected = {
      service: {
        healthyValue: '200 OK',
        name: 'textService',
        status: 'healthy',
        type: 'text',
        updatedAt: updatedAt,
        url: 'http://localhost',
        responseTimes: [1000]
      }
    }

    expect(fetch).toHaveBeenCalledTimes(1)
    expect(fetch).toHaveBeenCalledWith(mockService.url, {
      timeout: 15000
    })
    expect(callbackMock).toHaveBeenCalledWith(expected, ioMock)
  })

  test('Receiving a plain text response with unhealthy value', async () => {
    const mockService = getTextService()

    const callbackMock = jest.fn()

    const response = {
      status: 200,
      data: 'Turtle',
      duration: 1000
    }
    fetch.mockReturnValue(Promise.resolve(response))
    await getHealthCheck(mockService, ioMock, callbackMock)
    const expected = {
      service: {
        healthyValue: '200 OK',
        name: 'textService',
        status: 'unhealthy',
        type: 'text',
        updatedAt: updatedAt,
        url: 'http://localhost',
        responseTimes: [1000]
      }
    }

    expect(fetch).toHaveBeenCalledTimes(1)
    expect(fetch).toHaveBeenCalledWith(mockService.url, {
      timeout: 15000
    })
    expect(callbackMock).toHaveBeenCalledWith(expected, ioMock)
  })

  test('Receiving a plain text response with 500 status', async () => {
    const mockService = getTextService()

    const callbackMock = jest.fn()

    const response = {
      status: 500,
      duration: 1000
    }
    fetch.mockReturnValue(Promise.reject(response))
    await getHealthCheck(mockService, ioMock, callbackMock)
    const expected = {
      service: {
        healthyValue: '200 OK',
        name: 'textService',
        status: 'unhealthy',
        type: 'text',
        updatedAt: updatedAt,
        url: 'http://localhost',
        responseTimes: [1000]
      }
    }

    expect(fetch).toHaveBeenCalledTimes(1)
    expect(fetch).toHaveBeenCalledWith(mockService.url, {
      timeout: 15000
    })
    expect(callbackMock).toHaveBeenCalledWith(expected, ioMock)
  })
})