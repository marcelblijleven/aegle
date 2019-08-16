const updateService = require('../../src/update-service')

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
})




///
/*

const { updateStore } = require('./store')

function updateService(result, io) {
  if (result) {
    const status = result.healthy ? 'healthy' : 'unhealthy'
    updateStore(result.serviceName, status)
    io.sockets.emit('update service', result)
    return
  }

  console.info(`Server: No status update to send for service ${result.serviceName}.`)
}*/