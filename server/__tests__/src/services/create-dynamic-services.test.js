const createDynamicServices = require('../../../src/services/create-dynamic-services')

const service = {
  name: 'mock-service',
  url: 'http://localhost/{path}',
  params: {
    path: ['foo', 'bar', 'baz']
  }
}

describe('createDynamicServices', function() {
  test('Returns a new service for each param combination', function() {
    const services = createDynamicServices(service)
    expect(services.length).toEqual(3)
  })

  test('Puts the property value on the placeholder in the url', function() {
    const services = createDynamicServices(service)
    const urls = services.map(service => service.url)
    const expected = [
      'http://localhost/foo', 
      'http://localhost/bar', 
      'http://localhost/baz'
    ]
    expect(urls).toEqual(expected)
  })

  test('Removes the params property from the service', function() {
    const services = createDynamicServices(service)
    expect(services.every(service => service.params === undefined)).toEqual(true)
  })

  test('Appends the param to the service name', function() {
    const services = createDynamicServices(service)
    const names = services.map(service => service.name)
    const expected = ['mock-service-foo', 'mock-service-bar', 'mock-service-baz']
    expect(names).toEqual(expected)
  })
})
