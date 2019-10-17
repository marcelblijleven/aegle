const { verifyServices } = require('../../../src/services/service-utils')

const correctService = {
  name: 'service',
  url: 'http://fake.url.nl/',
  healthyValue: '200 OK',
  type: 'text'
}

const errorService = {
  name: 'errorService'
}

describe('verifyServices', function() {
  test('It should verify an array of correct services', function() {
    const services = [correctService, correctService]
    expect(verifyServices(services)).toEqual(true)
  })

  test('It should verify a single correct service', function() {
    expect(verifyServices(correctService)).toEqual(true)
  })

  test('It should detect an error in an array of services', function() {
    console.error = jest.fn()
    const services = [correctService, errorService]
    expect(verifyServices(services)).toEqual(false)
  })

  test('It should detect an error in a single service', function() {
    console.error = jest.fn()
    expect(verifyServices(errorService)).toEqual(false)
  })

  test('It should inform the when user an error has been detected', function() {
    console.error = jest.fn()
    verifyServices(errorService)
    expect(console.error).toHaveBeenCalled()
  })

  test('It should verify if the provided url is correct', function() {
    console.error = jest.fn()
    verifyServices({name: 'incorrectUrl', url: '/check', type: 'text', healthyValue: '200 OK'})
    expect(console.error).toHaveBeenCalledWith('Server: service url is incorrect')
  })

  test('It should allow domain names with dashed', function() {
    console.error = jest.fn()
    const result = verifyServices({name: 'with-dash', url: 'https://flux-capacitor.com', type: 'text', healthyValue: '200 OK'})
    expect(result).toEqual(true)
  })

  test('It should allow domain names with ports', function() {
    console.error = jest.fn()
    const result = verifyServices({name: 'with-port', url: 'https://flux-capacitor.com:8080', type: 'text', healthyValue: '200 OK'})
    expect(result).toEqual(true)
  })
})