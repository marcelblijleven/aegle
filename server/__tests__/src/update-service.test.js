const updateService = require('../../src/update-service')
jest.mock('../../src/update-webhook')
const updateWebhook = require('../../src/update-webhook')

jest.mock('../../src/store', () => {
  return {
    store: { values: {} },
    updateStore: jest.fn()
  }
})

const { updateStore } = require('../../src/store')
const ioMock = {
  sockets: {
    emit: jest.fn()
  }
}

// Suppress console.info
console.info = jest.fn()

describe('updateService', function() {
  beforeEach(() => {
    jest.resetModules()
  })

  afterEach(() => {
    jest.resetAllMocks()
  })

  test('It should call updateStore when receiving a result', function() {
    const result = { serviceName: 'mockService', healthy: true }
    updateService(result, ioMock)
    expect(updateStore).toHaveBeenCalled()
  })

  test('It should emit to socket when receiving a result', function() {
    const result = { serviceName: 'mockService', healthy: true }
    updateService(result, ioMock)
    expect(ioMock.sockets.emit).toHaveBeenCalled()
  })

  test('It should not update or emit when receiving no result', function() {
    const result = null
    updateService(result, ioMock)
    expect(updateStore).not.toHaveBeenCalled()
    expect(ioMock.sockets.emit).not.toHaveBeenCalled()
  })

  test('It should update and emit with \'healthy\' if status is true', function() {
    const result = { serviceName: 'service1', healthy: true }
    updateService(result, ioMock)
    expect(updateStore).toHaveBeenCalledWith('service1', 'healthy')
    expect(ioMock.sockets.emit).toHaveBeenCalledWith('update service', result)
  })

  test('It should update and emit with \'unhealthy\' if status is false', function() {
    const result = { serviceName: 'service1', healthy: false }
    updateService(result, ioMock)
    expect(updateStore).toHaveBeenCalledWith('service1', 'unhealthy')
    expect(ioMock.sockets.emit).toHaveBeenCalledWith('update service', result)
  })

  test('It should send an update to webhook when result is unhealthy and webhook env is set', function() {
    process.env.WEBHOOK = 'localhost'
    const result = { serviceName: 'service1', healthy: false }
    updateService(result, ioMock)
    expect(updateWebhook).toHaveBeenCalled()
  })

  test('It should not send an update to webhook when result is unhealthy and webhook env is set', function() {
    delete process.env.WEBHOOK
    const result = { serviceName: 'service1', healthy: false }
    updateService(result, ioMock)
    expect(updateWebhook).not.toHaveBeenCalled()
  })
})
