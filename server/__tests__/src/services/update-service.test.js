const updateService = require('../../../src/services/update-service')

jest.mock('../../../src/store', () => {
  return {
    store: { values: {} },
    updateStore: jest.fn()
  }
})

const { updateStore } = require('../../../src/store')
const ioMock = {
  sockets: {
    emit: jest.fn()
  }
}

const healthyService = { 
  service: {
    healthyValue: {
      status: "Alive and kicking"
    },
    name: 'service1',
    status: 'healthy',
    type: 'json',
    updatedAt: '8/6/2019, 12:00:00 AM',
    url: 'http://localhost',
  }
}

const unhealthyService = { 
  service: {
    healthyValue: {
      status: "Alive and kicking"
    },
    name: 'service1',
    status: 'unhealthy',
    type: 'json',
    updatedAt: '8/6/2019, 12:00:00 AM',
    url: 'http://localhost',
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
    const result = healthyService
    updateService(result, ioMock)
    expect(updateStore).toHaveBeenCalled()
  })

  test('It should emit to socket when receiving a result', function() {
    const result = healthyService
    updateService(result, ioMock)
    expect(ioMock.sockets.emit).toHaveBeenCalled()
  })

  test('It should not update or emit when receiving no result', function() {
    const result = null
    updateService(result, ioMock)
    expect(updateStore).not.toHaveBeenCalled()
    expect(ioMock.sockets.emit).not.toHaveBeenCalled()
  })

  test('It should update and emit with \'healthy\' if status is healthy', function() {
    const result = healthyService
    updateService(result, ioMock)
    expect(updateStore).toHaveBeenCalledWith('service1', 'healthy')
    expect(ioMock.sockets.emit).toHaveBeenCalledWith('service:update', result)
  })

  test('It should update and emit with \'unhealthy\' if status is unhealthy', function() {
    const result = unhealthyService
    updateService(result, ioMock)
    expect(updateStore).toHaveBeenCalledWith('service1', 'unhealthy')
    expect(ioMock.sockets.emit).toHaveBeenCalledWith('service:update', result)
  })
})
