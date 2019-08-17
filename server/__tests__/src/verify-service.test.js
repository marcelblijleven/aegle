const verifyServices = require('../../src/verify-services')

const correctService = {
  name: 'service',
  url: 'http://fake.url.nl/',
  healthyValue: '200 OK',
  type: 'text'
}

const errorService = {
  name: 'errorService',
  url: 'http://fake.url.nl/',
  type: 'html'
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

  test('It should verify if the provided type is correct', function() {
    console.error = jest.fn()
    verifyServices({name: 'incorrectUrl', url: 'http://fake.url.nl/', type: 'response', healthyValue: '200 OK'})
    expect(console.error).toHaveBeenCalledWith('Server: unknown type \'response\'')
  })

  test('It should verify if the provided url is correct', function() {
    console.error = jest.fn()
    verifyServices({name: 'incorrectUrl', url: '/check', type: 'text', healthyValue: '200 OK'})
    expect(console.error).toHaveBeenCalledWith('Server: service url should be absolute')
  })
})