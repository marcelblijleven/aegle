const fetch = require('node-fetch')
const { Response } = jest.requireActual('node-fetch')
const getHealthCheck = require('../../src/get-healthcheck')

jest.mock('node-fetch')

describe('getHealthcheck', function () {
  afterEach(() => {
    jest.resetAllMocks()
  })


  test('Succesfully calling endpoint with correct healthy value', async() => {
    const mockService = {
      name: 'testService',
      url: 'http://localhost',
      healthyValue: { status: "Alive and kicking" }
    }

    const mockResponse = {
      status: "Alive and kicking",
    }

    // Setup mock response for the fetch call
    fetch.mockReturnValue(Promise.resolve(new Response(JSON.stringify(mockResponse))))
    
    const result = await getHealthCheck(mockService)
    const expected = { serviceName: 'testService', healthy: true }
    
    expect(fetch).toHaveBeenCalledTimes(1)
    expect(fetch).toHaveBeenCalledWith(mockService.url, { method: 'GET' })
    expect(result).toEqual(expected)
  })

  test('Succesfully calling endpoint with incorrect healthy value', async() => {
    const mockService = {
      name: 'testService',
      url: 'http://localhost',
      healthyValue: { status: "Alive and kicking" }
    }

    // Setup mock response for the fetch call
    fetch.mockReturnValue(Promise.reject('error'))
    
    const result = await getHealthCheck(mockService)
    const expected = { serviceName: 'testService', healthy: false }
    
    expect(fetch).toHaveBeenCalledTimes(1)
    expect(fetch).toHaveBeenCalledWith(mockService.url, { method: 'GET' })
    expect(result).toEqual(expected)
  })
})
