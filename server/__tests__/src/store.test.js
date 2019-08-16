
const { store, initialiseStore, updateStore } = require('../../src/store')
const isEqual = require('../../src/is-equal')
const services = [
  {
    name: 'service1'
  },
  {
    name: 'service2'
  },
  {
    name: 'service3'
  }
]

describe('Store', function() {
  beforeEach(function() {
    store.clearAll()
  })
  
  test('It should load the store with empty values', function() {
    expect(store.values).toEqual({})
  })

  test('Initialising the store should load services with status \'pending\'', function() {
    initialiseStore(services)
    let check

    for (const prop in store.values) {
      if (store.values.hasOwnProperty(prop)) {
        check = store.values[prop] === 'pending'
      }
    }
    expect(check).toEqual(true)
  })

  test('Calling clearAll resets store', function() {
    initialiseStore(services)
    store.clearAll()
    expect(store.values).toEqual({})
  })

  test('Calling get retrieves the value', function() {
    initialiseStore(services)
    const value = store.get('service1')
    expect(value).toEqual('pending')
  })

  test('Calling set adds the key value pair if it doesn\'t exist', function() {
    const valueBefore = store.get('service1')
    store.set('service1', 'has set')
    const valueAfter = store.get('service1')
    expect(valueBefore).toEqual(null)
    expect(valueAfter).toEqual('has set')
  })

  test('Calling set updates the value', function() {
    initialiseStore(services)
    store.set('service1', 'updated')
    const value = store.get('service1')
    expect(value).toEqual('updated')
  })

  test('Calling remove removes the key from values', function() {
    initialiseStore(services)
    const before = store.get('service1')
    store.remove('service1')
    expect(before).toEqual('pending')
    expect(store.get('service1')).toEqual(null)
  })

  test('Calling json returns the values object', function() {
    initialiseStore(services)
    const check = isEqual(store.json(), {
      service1: 'pending',
      service2: 'pending',
      service3: 'pending'}
    )
    expect(check).toEqual(true)
  })

  test('Calling update store should update key with value', function() {
    updateStore('hello', 'world')
    expect(store.get('hello')).toEqual('world')
  })
})
