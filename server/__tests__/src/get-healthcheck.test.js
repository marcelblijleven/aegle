const mockAxios = require('axios')
const { advanceTo, clear } = require('jest-date-mock')
const getHealthCheck = require('../../src/get-healthcheck')

const ioMock = {}
const updatedAt = new Date(2019, 7, 6, 0, 0, 0).toLocaleString('nl')

describe('getHealthcheck', function () {
  beforeEach(() => {
    advanceTo(new Date(2019, 7, 6, 0, 0, 0))
  })

  afterEach(() => {
    jest.resetAllMocks()
    clear()
  })

  test('Succesfully calling endpoint with correct healthy value', async () => {
    const mockService = {
      name: 'testService',
      url: 'http://localhost',
      healthyValue: {
        status: "Alive and kicking"
      },
      type: 'json'
    }

    const callbackMock = jest.fn()
    const mockResponse = { 
      status: 200,
      data: { status: "Alive and kicking" } 
    }

    // Setup mock response for the axios call
    mockAxios.get.mockReturnValue(Promise.resolve(mockResponse))

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
      }
    }

    expect(mockAxios.get).toHaveBeenCalledTimes(1)
    expect(mockAxios.get).toHaveBeenCalledWith(mockService.url, {
      timeout: 15000
    })
    expect(callbackMock).toHaveBeenCalledWith(expected, ioMock)
  })

  test('Succesfully calling endpoint with incorrect healthy value', async () => {
    const mockService = {
      name: 'testService',
      url: 'http://localhost',
      healthyValue: {
        status: "Alive and kicking"
      },
      type: 'json'
    }

    const callbackMock = jest.fn()

    // Setup mock response for the axios call
    mockAxios.get.mockReturnValue(Promise.reject(new Error('mock error')))
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
      }
    }

    expect(mockAxios.get).toHaveBeenCalledTimes(1)
    expect(mockAxios.get).toHaveBeenCalledWith(mockService.url, {
      timeout: 15000
    })
    expect(callbackMock).toHaveBeenCalledWith(expected, ioMock)
  })

  test('Receiving a status code other than 200', async () => {
    const mockService = {
      name: 'testService',
      url: 'http://localhost',
      healthyValue: {
        status: "Alive and kicking"
      },
      type: 'json'
    }

    const callbackMock = jest.fn()
    const errorResponse503 = {
      status: 503,
      statusText: '503 Service unavailable'
    }
    mockAxios.get.mockReturnValue(Promise.resolve(errorResponse503))

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
      }
    }

    expect(mockAxios.get).toHaveBeenCalledTimes(1)
    expect(mockAxios.get).toHaveBeenCalledWith(mockService.url, {
      timeout: 15000
    })
    expect(callbackMock).toHaveBeenCalledWith(expected, ioMock)
  })

  test('Receiving a response for html pages', async () => {
    const mockService = {
      name: 'htmlService',
      url: 'http://localhost',
      healthyValue: '', // No need for healthy value for html pages
      type: 'html'
    }

    const callbackMock = jest.fn()
    const response = { 
      status: 200,
      data: '<h1>Hello</h1>'
    }

    mockAxios.get.mockReturnValue(Promise.resolve(response))
    await getHealthCheck(mockService, ioMock, callbackMock)
    const expected = {
      service: {
        healthyValue: '',
        name: 'htmlService',
        status: 'healthy',
        type: 'html',
        updatedAt: updatedAt,
        url: 'http://localhost',
      }
    }

    expect(mockAxios.get).toHaveBeenCalledTimes(1)
    expect(mockAxios.get).toHaveBeenCalledWith(mockService.url, {
      timeout: 15000
    })
    expect(callbackMock).toHaveBeenCalledWith(expected, ioMock)
  })

  test('Receiving a non 200 response for html pages', async () => {
    const mockService = {
      name: 'htmlService',
      url: 'http://localhost',
      healthyValue: '', // No need for healthy value for html pages
      type: 'html'
    }

    const callbackMock = jest.fn()

    const response = { 
      status: 404,
      data: '<h1>Hello</h1>'
    }

    mockAxios.get.mockReturnValue(Promise.resolve(response))
    await getHealthCheck(mockService, ioMock, callbackMock)
    const expected = {
      service: {
        healthyValue: '',
        name: 'htmlService',
        status: 'unhealthy',
        type: 'html',
        updatedAt: updatedAt,
        url: 'http://localhost',
      }
    }

    expect(mockAxios.get).toHaveBeenCalledTimes(1)
    expect(mockAxios.get).toHaveBeenCalledWith(mockService.url, {
      timeout: 15000
    })
    expect(callbackMock).toHaveBeenCalledWith(expected, ioMock)
  })

  test('Receiving a plain text response with healthy value', async () => {
    const mockService = {
      name: 'textService',
      url: 'http://localhost',
      healthyValue: '200 OK',
      type: 'text'
    }

    const callbackMock = jest.fn()

    const response = {
      status: 200,
      data: '200 OK'
    }
    mockAxios.get.mockReturnValue(Promise.resolve(response))
    await getHealthCheck(mockService, ioMock, callbackMock)
    const expected = {
      service: {
        healthyValue: '200 OK',
        name: 'textService',
        status: 'healthy',
        type: 'text',
        updatedAt: updatedAt,
        url: 'http://localhost',
      }
    }

    expect(mockAxios.get).toHaveBeenCalledTimes(1)
    expect(mockAxios.get).toHaveBeenCalledWith(mockService.url, {
      timeout: 15000
    })
    expect(callbackMock).toHaveBeenCalledWith(expected, ioMock)
  })

  test('Receiving a plain text response with unhealthy value', async () => {
    const mockService = {
      name: 'textService',
      url: 'http://localhost',
      healthyValue: '200 OK',
      type: 'text'
    }

    const callbackMock = jest.fn()

    const response = {
      status: 200,
      data: 'Turtle'
    }
    mockAxios.get.mockReturnValue(Promise.resolve(response))
    await getHealthCheck(mockService, ioMock, callbackMock)
    const expected = {
      service: {
        healthyValue: '200 OK',
        name: 'textService',
        status: 'unhealthy',
        type: 'text',
        updatedAt: updatedAt,
        url: 'http://localhost',
      }
    }

    expect(mockAxios.get).toHaveBeenCalledTimes(1)
    expect(mockAxios.get).toHaveBeenCalledWith(mockService.url, {
      timeout: 15000
    })
    expect(callbackMock).toHaveBeenCalledWith(expected, ioMock)
  })

  test('Receiving a plain text response with 500 status', async () => {
    const mockService = {
      name: 'textService',
      url: 'http://localhost',
      healthyValue: '200 OK',
      type: 'text'
    }

    const callbackMock = jest.fn()

    const response = {
      status: 500
    }
    mockAxios.get.mockReturnValue(Promise.resolve(response))
    await getHealthCheck(mockService, ioMock, callbackMock)
    const expected = {
      service: {
        healthyValue: '200 OK',
        name: 'textService',
        status: 'unhealthy',
        type: 'text',
        updatedAt: updatedAt,
        url: 'http://localhost',
      }
    }

    expect(mockAxios.get).toHaveBeenCalledTimes(1)
    expect(mockAxios.get).toHaveBeenCalledWith(mockService.url, {
      timeout: 15000
    })
    expect(callbackMock).toHaveBeenCalledWith(expected, ioMock)
  })
})