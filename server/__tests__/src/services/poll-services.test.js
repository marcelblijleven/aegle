const pollServices = require('../../../src/services/poll-services')

jest.mock('../../../src/healthcheck/get-healthcheck')
const getHealthCheck = require('../../../src/healthcheck/get-healthcheck')

const services = [
  {
    name: 'service1',
    url: 'localhost'
  },
  {
    name: 'service2',
    url: 'localhost'
  },
  {
    name: 'service3',
    url: 'localhost'
  }
]

describe('pollServices', function() {
  afterEach(function() {
    jest.resetAllMocks()
  })

  test('It should call getHealthCheck for each service', async () => {
    await pollServices(services, null)
    expect(getHealthCheck).toHaveBeenCalledTimes(3)
  })

  test('It should log an error when getHealthCheck throws one', async() => {
    console.error = jest.fn()
    getHealthCheck.mockImplementation(() => {
      throw new Error()
    })
    await pollServices(services, null)
    expect(getHealthCheck).toHaveBeenCalledTimes(3)
    expect(console.error).toHaveBeenCalledTimes(3)
  })
})

/**
 * async function pollServices(services, io) {
  for (const service of services) {
    try {
      getHealthCheck(service, io, updateService)
    }
    catch(error) {
      console.error('Server: error in pollServices.', error.message)
    }
  }
}
 */