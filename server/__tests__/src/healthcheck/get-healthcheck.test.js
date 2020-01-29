jest.mock('../../../src/healthcheck/get')

const http = require('http')
const https = require('https')
const get = require('../../../src/healthcheck/get')
const { advanceTo, clear } = require('jest-date-mock')

const getHealthcheck = require('../../../src/healthcheck/get-healthcheck')

const mockDate = new Date(2019, 9, 4, 0, 0, 0)
const updatedAt = new Date(2019, 9, 4, 0, 0, 0).toLocaleString('nl')
const getMockService = function() {
  return {
    url: 'http://localhost',
    healthyValue: '200 OK',
    responseTimes: [],
    updatedAt: null,
    status: null
  }
}
const io = {}

describe('getHealthcheck', function() {
  beforeEach(function() {
    advanceTo(mockDate)
  })

  afterEach(function() {
    jest.resetAllMocks()
    clear()
  })

  test('Calling callback with successfull healthy response', async () => {
    const service = getMockService()
    const expected = getMockService()
    const callback = jest.fn()
    
    get.mockReturnValue(Promise.resolve({ data: '200 OK', duration: 1000 }))
    await getHealthcheck(service, io, callback)

    expected.responseTimes.push(1000)
    expected.updatedAt = updatedAt
    expected.status = 'healthy'
  
    expect(callback).toBeCalledWith({ service: expected }, io)
  })

  test('Calling callback with successfull unhealthy response', async () => {
    const service = getMockService()
    const expected = getMockService()
    const callback = jest.fn()
    
    get.mockReturnValue(Promise.resolve({ data: { status: 200 }, duration: 1000 }))
    await getHealthcheck(service, io, callback)

    expected.responseTimes.push(1000)
    expected.updatedAt = updatedAt
    expected.status = 'unhealthy'
  
    expect(callback).toBeCalledWith({ service: expected }, io)
  })

  test('Calling callback with service with empty healthy value', async () => {
    const service = getMockService()
    const expected = getMockService()
    const callback = jest.fn()
    delete service.healthyValue

    get.mockReturnValue(Promise.resolve({ data: '200 OK', ok: true, duration: 1000 }))
    await getHealthcheck(service, io, callback)

    delete expected.healthyValue
    expected.responseTimes.push(1000)
    expected.updatedAt = updatedAt
    expected.status = 'healthy'
  
    expect(callback).toBeCalledWith({ service: expected }, io)
  })

  test('Calling callback with service with empty string healthy value', async () => {
    const service = getMockService()
    const expected = getMockService()
    const callback = jest.fn()
    service.healthyValue = ''

    get.mockReturnValue(Promise.resolve({ data: '200 OK', ok: true, duration: 1000 }))
    await getHealthcheck(service, io, callback)

    expected.healthyValue = ''
    expected.responseTimes.push(1000)
    expected.updatedAt = updatedAt
    expected.status = 'healthy'
  
    expect(callback).toBeCalledWith({ service: expected }, io)
  })

  test('Calling callback with error response', async () => {
    const service = getMockService()
    const expected = getMockService()
    const callback = jest.fn()
    console.error = jest.fn() // suppress console.error
    get.mockReturnValue(Promise.reject({ message: 'mock error', duration: 1000 }))
    await getHealthcheck(service, io, callback)

    expected.responseTimes.push(1000)
    expected.updatedAt = updatedAt
    expected.status = 'unhealthy'

    expect(callback).toBeCalledWith({ service: expected }, io)
  })

  test('Add custom https agent if applied', async () => {
    const service = getMockService()
    service.url = 'https://localhost' // Set protocol to https
    const callback = jest.fn()
    const agentData = { mock: 'data'}
    const expectedAgent = https.Agent(agentData)
    service.agent = agentData

    get.mockReturnValue(Promise.resolve({ data: '200 OK', duration: 1000 }))
    await getHealthcheck(service, io, callback)

    const expectedOptions = { timeout: 15 * 1000, agent: expectedAgent }
    const calledOptionsArgument = get.mock.calls[0][1]
    expect(get).toBeCalled()
    expect(JSON.stringify(calledOptionsArgument)).toEqual(JSON.stringify(expectedOptions))
  })

  test('Custom http will be used for http protocol', async () => {
    const service = getMockService()
    const callback = jest.fn()
    const agentData = { mock: 'data'}
    const expectedAgent = http.Agent(agentData)
    service.agent = agentData

    get.mockReturnValue(Promise.resolve({ data: '200 OK', duration: 1000 }))
    await getHealthcheck(service, io, callback)

    const expectedOptions = { timeout: 15 * 1000, agent: expectedAgent }
    const calledOptionsArgument = get.mock.calls[0][1]
    expect(get).toBeCalled()
    expect(JSON.stringify(calledOptionsArgument)).toEqual(JSON.stringify(expectedOptions))
  })
})