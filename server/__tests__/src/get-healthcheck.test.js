const fetch = require('node-fetch')
const { Response } = jest.requireActual('node-fetch')
const getHealthCheck = require('../../src/get-healthcheck')

jest.mock('node-fetch')
const ioMock = {}

describe('getHealthcheck', function () {
  afterEach(() => {
    jest.resetAllMocks()
  })

  test('Succesfully calling endpoint with correct healthy value', async() => {
    const mockService = {
      name: 'testService',
      url: 'http://localhost',
      healthyValue: { status: "Alive and kicking" },
      type: 'json'
    }

    const callbackMock = jest.fn()
    const mockResponse = { status: "Alive and kicking" }

    // Setup mock response for the fetch call
    fetch.mockReturnValue(Promise.resolve(new Response(JSON.stringify(mockResponse))))
    
    await getHealthCheck(mockService, ioMock, callbackMock)
    const expected = { serviceName: 'testService', healthy: true }
    
    expect(fetch).toHaveBeenCalledTimes(1)
    expect(fetch).toHaveBeenCalledWith(mockService.url, { method: 'GET' , timeout: 15000 })
    expect(callbackMock).toHaveBeenCalledWith(expected, ioMock)
  })

  test('Succesfully calling endpoint with incorrect healthy value', async() => {
    const mockService = {
      name: 'testService',
      url: 'http://localhost',
      healthyValue: { status: "Alive and kicking" },
      type: 'json'
    }

    const callbackMock = jest.fn()
    
    // Setup mock response for the fetch call
    fetch.mockReturnValue(Promise.reject(new Error('mock error')))
    console.error = jest.fn()

    await getHealthCheck(mockService, ioMock, callbackMock)
    const expected = { serviceName: 'testService', healthy: false }
    
    expect(fetch).toHaveBeenCalledTimes(1)
    expect(fetch).toHaveBeenCalledWith(mockService.url, { method: 'GET' , timeout: 15000 })
    expect(callbackMock).toHaveBeenCalledWith(expected, ioMock)
  })

  test('Receiving a status code other than 200', async() => {
    const mockService = {
      name: 'testService',
      url: 'http://localhost',
      healthyValue: { status: "Alive and kicking" },
      type: 'json'
    }

    const callbackMock = jest.fn()
	  const errorResponse503 = new Response('503 Service unavailable', {
		status: 503,
	  });
    fetch.mockReturnValue(Promise.resolve(errorResponse503))

    await getHealthCheck(mockService, ioMock, callbackMock)
    const expected = { serviceName: 'testService', healthy: false }
    
    expect(fetch).toHaveBeenCalledTimes(1)
    expect(fetch).toHaveBeenCalledWith(mockService.url, { method: 'GET' , timeout: 15000 })
    expect(callbackMock).toHaveBeenCalledWith(expected, ioMock)
  })

  test('Receiving a response for html pages', async() => {
    const mockService=  {
      name: 'htmlService',
      url: 'http://localhost',
      healthyValue: '', // No need for healthy value for html pages
      type: 'html'
    }

    const callbackMock = jest.fn()
    const response = new Response('<h1>Hello</h1>', { status: 200 })

    fetch.mockReturnValue(Promise.resolve(response))
    await getHealthCheck(mockService, ioMock, callbackMock)
    const expected = { serviceName: 'htmlService', healthy: true }
    
    expect(fetch).toHaveBeenCalledTimes(1)
    expect(fetch).toHaveBeenCalledWith(mockService.url, { method: 'GET' , timeout: 15000 })
    expect(callbackMock).toHaveBeenCalledWith(expected, ioMock)
  })

  test('Receiving a non 200 response for html pages', async() => {
    const mockService=  {
      name: 'htmlService',
      url: 'http://localhost',
      healthyValue: '', // No need for healthy value for html pages
      type: 'html'
    }

    const callbackMock = jest.fn()

    const response = new Response('<h1>Hello</h1>', { status: 404 })

    fetch.mockReturnValue(Promise.resolve(response))
    await getHealthCheck(mockService, ioMock, callbackMock)
    const expected = { serviceName: 'htmlService', healthy: false }
    
    expect(fetch).toHaveBeenCalledTimes(1)
    expect(fetch).toHaveBeenCalledWith(mockService.url, { method: 'GET' , timeout: 15000 })
    expect(callbackMock).toHaveBeenCalledWith(expected, ioMock)
  })

  test('Receiving a plain text response with healthy value', async() => {
    const mockService=  {
      name: 'textService',
      url: 'http://localhost',
      healthyValue: '200 OK',
      type: 'text'
    }

    const callbackMock = jest.fn()

    const response = new Response('200 OK', { status: 200 })
    fetch.mockReturnValue(Promise.resolve(response))
    await getHealthCheck(mockService, ioMock, callbackMock)
    const expected = { serviceName: 'textService', healthy: true }

    expect(fetch).toHaveBeenCalledTimes(1)
    expect(fetch).toHaveBeenCalledWith(mockService.url, { method: 'GET' , timeout: 15000 })
    expect(callbackMock).toHaveBeenCalledWith(expected, ioMock)
  })

  test('Receiving a plain text response with unhealthy value', async() => {
    const mockService=  {
      name: 'textService',
      url: 'http://localhost',
      healthyValue: '200 OK',
      type: 'text'
    }

    const callbackMock = jest.fn()

    const response = new Response('Turtle', { status: 200 })
    fetch.mockReturnValue(Promise.resolve(response))
    await getHealthCheck(mockService, ioMock, callbackMock)
    const expected = { serviceName: 'textService', healthy: false }

    expect(fetch).toHaveBeenCalledTimes(1)
    expect(fetch).toHaveBeenCalledWith(mockService.url, { method: 'GET' , timeout: 15000 })
    expect(callbackMock).toHaveBeenCalledWith(expected, ioMock)
  })

  test('Receiving a plain text response with 500 status', async() => {
    const mockService=  {
      name: 'textService',
      url: 'http://localhost',
      healthyValue: '200 OK',
      type: 'text'
    }

    const callbackMock = jest.fn()

    const response = new Response('500 Internal server error', { status: 500 })
    fetch.mockReturnValue(Promise.resolve(response))
    await getHealthCheck(mockService, ioMock, callbackMock)
    const expected = { serviceName: 'textService', healthy: false }

    expect(fetch).toHaveBeenCalledTimes(1)
    expect(fetch).toHaveBeenCalledWith(mockService.url, { method: 'GET' , timeout: 15000 })
    expect(callbackMock).toHaveBeenCalledWith(expected, ioMock)
  })
})
